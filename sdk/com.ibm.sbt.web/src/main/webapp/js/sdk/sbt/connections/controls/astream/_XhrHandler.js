/*
 * © Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
define(["../../../declare", "../../../config", "../../../stringUtil", "../../../lang", "../../../util"], function(declare, config, stringUtil, lang, util){
    /*
     * @class _XhrHandler
     */
    var _XhrHandler = declare(null,
    {
        /*
         * The endpoint to use when making xhr requests.
         * 
         * @property endpoint 
         * @type Object
         * @default null
         */
        endpoint: null,
        
        /*
         * The type of auth we will use. This will have been determined by the url given to the activitystream as an arg.
         * 
         * @property authType 
         * @type String
         * @default "public"
         */
        authType: "public",
        
        /*
         * Service mappings, e.g. if /files path is customised to /myfiles
         * 
         * @property contextRootMap 
         * @type Object
         */
        contextRootMap: {
            connections: "connections"
        },
        
        /*
         * This method modifies the activitystream request urls so that they
         * 1. Go through our proxy, and has the correct service mapping.
         * 2. All conform to the same auth type.
         * 
         * Auth types: 
         * sso    url pattern: '.../opensocial/rest/...'
         * oauth  url pattern: '.../opensocial/oauth/rest/...'
         * basic  url pattern: '.../opensocial/basic/rest/...'
         * public url pattern: '.../opensocial/anonymous/rest/...'
         * 
         * Most urls will be using sso by default.
         * 
         * @method modifyUrl
         * 
         * @param {Object} args
         * 
         * @param {String} args.url The url which we will xhr to. If this is not present this method does nothing.
         */
        modifyUrl: function(args){
            
            
            if(this.endpoint){
                lang.mixin(this.contextRootMap, this.endpoint.serviceMappings);
                
                if(this.contextRootMap && !util.isEmptyObject(this.contextRootMap)){
                    var url = args.url || args.serviceUrl;
                    url = stringUtil.transform(url, this.contextRootMap, function(value, key){
                        if(!value){
                            return key;
                        }
                        else{
                            return value;
                        }
                    }, this);
                    if(args.url){
                        args.url = url;
                    }
                    else{
                        args.serviceUrl = url;
                    }
                }
            }
            
            if(!args.url){
                return;
            }
            if (args.url.indexOf("/") === 0){
                args.serviceUrl = args.url;
                delete args.url;
            } else if (args.url.indexOf("proxy") === -1){
                if(args.url.indexOf("https") !== -1)
                    args.url = this.endpoint.proxy.proxyUrl + "/" + this.endpoint.proxyPath + "/" + args.url.replace(/https:\/\/.[^\/]+\//, "");
                else if(args.url.indexOf("http") !== -1)
                    args.url = this.endpoint.proxy.proxyUrl + "/" + this.endpoint.proxyPath + "/" + args.url.replace(/http:\/\/.[^\/]+\//, "");
            }
            if(args.url.indexOf("opensocial/rest") !== -1)
                args.url = args.url.replace("opensocial/","opensocial/" + this.endpoint.authType +  "/");
        },
        
        /*
         * The constructor.
         * 
         * @method constructor
         * @param {String} endpointName The name of the endpoint to use.
         */
        constructor: function(endpointName){
            this.endpoint = config.findEndpoint(endpointName);
        },
        
        /*
         * Make an XHR HEAD request.
         * @method xhrGet
         * @param args The xhr args.
         */
        xhrGet: function(args){
            this.modifyUrl(args);
            return this.xhr("GET", args);
        },
        
        /*
         * Make an XHR POST request.
         * @param args xhr args
         */
        xhrPost: function(args){
            this.modifyUrl(args);
            return this.xhr("POST", args);
        },
        
        /*
         * Make an XHR PUT request.
         * @param args xhr args
         */
        xhrPut: function(args){
            this.modifyUrl(args);
            return this.xhr("PUT", args);
        },
        
        /*
         * Make an XHR DELETE request.
         * @param args xhr args
         */
        xhrDelete: function(args){
            this.modifyUrl(args);
            return this.xhr("DELETE", args);
        },
        
        /*
         * Make an XHR GET request.
         * @param args xhr args
         */
        xhrHead: function(args){
            this.modifyUrl(args);
            return this.xhr("HEAD", args);
        },
        
        /*
         * An xhrHandler needs to have an xhr function to use the xhr handler init in connections >= 4.5
         */
        xhr: function(method, args){
            this.modifyUrl(args);
            return this.endpoint.xhr(method, args);
        }
    });
    
    return _XhrHandler;
});
