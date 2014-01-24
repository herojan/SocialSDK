***REMOVED***

/**
 * Plugin Name: Social Business Toolkit integration plugin
 * Plugin URI: http://example.com
 * Description: Plugin providing access to the SBTK javascript api and controls.
 * Version: 0.1
 * Author: Lorenzo Boccaccia
 * Author URI: https://github.com/LorenzoBoccaccia
 * License: Apache 2.0
 */


// Flag used to indicate to core that we are a Wordpress plugin
define('IBM_SBT_WORDPRESS_PLUGIN', 'IBM SBT Wordpress Plugin');

// Flag used to prevent direct script access
define('SBT_SDK', 'IBM Social Business Toolkit');
// Base directory
define('BASE_PATH', dirname(__FILE__));
// Samples directory
define('SAMPLES_PATH', BASE_PATH . '/views/social');
// Flag to indicate whether SBT JS header code has already been created or not
// (header code should only be created once)
$headerCreated = false;

// Require base controllers
require_once 'system/core/BaseController.php';
require_once 'system/core/BasePluginController.php';

// TODO: Create autoloader
require_once 'controllers/SBTKCommunities.php';
require_once 'controllers/SBTKBookmarks.php';
require_once 'controllers/SBTKFiles.php';
require_once 'controllers/SBTKForums.php';
require_once 'controllers/SBTKOptions.php';
require_once 'models/SBTKSettings.php';
// TODO: Move functions into helper file

/**
 * Callback for creating a plugin using custom code.
 *
 * @param unknown $args
 *
 * @author Benjamin Jakobus
 */
function widget_sbtk_custom_plugin($args) {
	$plugin = new SBTKForums();
	$settings = new SBTKSettings();
	if (!$headerCreated) {
		$plugin->createHeader();
		$headerCreated = true;
	}
	
	// Output code for checking whether a user is authenticated
	// TODO: Consolidate with OAuth
	if ($settings->getAuthenticationMethod() == 'oauth1') {
		
	} else if ($settings->getAuthenticationMethod() == 'basic') {
		require_once 'views/basic-auth-login.php';
	}
	
// 	echo '<div class="ibmsbtk-widget" style="display: none;">'; TODO: Uncomment!
	$pluginData = get_option($args['widget_name']);
	if ($pluginData === FALSE) {
		$pluginData = get_option(createSampleName($args['widget_name']));
	}
	
	echo $pluginData['html'];
	echo '<script type="text/javascript">' . $pluginData['javascript'] . '</script>';
// 	echo '</div>';
}

/**
 * Callback for creating the plugin header.
 *
 * @param unknown $args
 *
 * @author Benjamin Jakobus
 */
function widget_sbtk_header($args) {
	$plugin = new SBTKForums();
	$plugin->createHeader();
}

/**
 * Creates a sample filename from a widget name.
 * 
 * @param unknown $name
 * @return string
 * 
 * @author Benjamin Jakobus
 */
function createSampleName($name) {
	$sample = str_replace(' ', '-', $name);
	$sample = trim(strtolower($sample)) . '.php';
	return $sample;
}

/**
 * Extracts the plugin name given a PHP sample filename.
 * 
 * @param unknown $pluginFile
 * @return string
 * 
 * @author Benjamin Jakobus
 */
function extractSampleName($pluginFile) {
	$plugin = str_replace('.php', '', $pluginFile);
	$plugin = str_replace('-', ' ', $plugin);
	return ucwords($plugin);
}

function extractSampleContents($type, $plugin) {
	$sbtkPlugin = __DIR__ . '/views/social/' . $type . '/' . $plugin;
	$file = file_get_contents($sbtkPlugin);
	
	// Extract HTML
	$html = preg_replace('#<script.*</script>#is', '', $file);
	
	// Extract JavaScript
	preg_match('#<script.*</script>#is', $file, $javascript);
	$javascript = str_replace('</script>', '', $javascript);
	$javascript = str_replace('<script type="text/javascript">', '', $javascript);
	$javascript = preg_replace("/\<\?php.*?>/is", "true", $javascript);
	$javascript = str_replace('rendererArgs : { containerType : "true" }', '', $javascript);
	
	$contents = array();
	$contents['html'] = $html;
	$contents['javascript'] = $javascript;
	return $contents;
}

function strEndsWith($haystack, $needle) {
	return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
}


// Register the header with Wordpress
add_action('wp_head', 'widget_sbtk_header');

// Register different widgets with Wordpress
$plugins = get_option('custom_plugins');

if (isset($plugins) && $plugins != null) {
	foreach ($plugins as $plugin) {
		$plugin_id = str_replace(' ', '_', $plugin);
		if (strEndsWith($plugin, '.php')) {
			continue;
		}
		wp_register_sidebar_widget('custom_plugin_' . $plugin_id, $plugin, 'widget_sbtk_custom_plugin', array('description' => 'Displays a custom SBT plugin.'));
	}
	
	$sampleTypes = array(
			'blogs',
			'bookmarks',
			'communities',
			'files',
			'forums',
			'profiles'
	);
	
	$customPlugins = get_option('custom_plugins');
		
	// If no plugins exist, then create a new array
	if ($customPlugins === FALSE) {
		$customPlugins = array();
	}
	
	foreach ($sampleTypes as $sample) {
		$samples = scandir(SAMPLES_PATH . '/' . $sample);
		if (isset($samples)) {
			foreach ($samples as $plugin) {
				if ($plugin == '.' || $plugin == '..') {
					continue;
				}

				// Check if sample code is already in database - if not, insert it
				$pluginData = get_option($plugin);
				if ($pluginData === FALSE) {
					array_push($customPlugins, $plugin);
					
					if(get_option('custom_plugins') === FALSE){
						add_option('custom_plugins',  $customPlugins);
					} else {
						update_option('custom_plugins', $customPlugins);
					}
	
					$contents = extractSampleContents($sample, $plugin);
					$pluginData['javascript'] = $contents['javascript'][0];
					$pluginData['html'] = $contents['html'];
					add_option($plugin,  $pluginData);
				}
				wp_register_sidebar_widget('sample_plugin_' . $plugin, extractSampleName($plugin), 'widget_sbtk_custom_plugin', array('description' => 'Displays a sample SBT plugin.'));
			}
		}
	}
}

// Register templates
require_once 'sbtk-templates.php';

// Register options page
require_once 'sbtk-options.php';

// Make sure that we have connection information for at least one endpoint;
// if not, then populate the DB with a default.
$options = new SBTKOptions();

add_action('wp_head', 'myStartSession', 1);
add_action('wp_logout', 'myEndSession');
add_action('wp_login', 'myEndSession');

function myStartSession() {
	if (!session_id()) {
		require BASE_PATH . '/config.php';
		session_name($config['session_name']);
		session_start();
	}
}

function myEndSession() {
	session_destroy ();
}
?>
