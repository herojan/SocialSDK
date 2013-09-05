/*
 * � Copyright IBM Corp. 2013
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
package com.ibm.sbt.test.js.connections;

import org.junit.AfterClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.ibm.sbt.test.js.connections.search.rest.ApplicationSearch;
import com.ibm.sbt.test.js.connections.search.rest.DateSearch;
import com.ibm.sbt.test.js.connections.search.rest.MyApplicationSearch;
import com.ibm.sbt.test.js.connections.search.rest.MyDateSearch;
import com.ibm.sbt.test.js.connections.search.rest.MyPeopleSearch;
import com.ibm.sbt.test.js.connections.search.rest.MySearch;
import com.ibm.sbt.test.js.connections.search.rest.MyTagSearch;
import com.ibm.sbt.test.js.connections.search.rest.PeopleSearch;
import com.ibm.sbt.test.js.connections.search.rest.Search;
import com.ibm.sbt.test.js.connections.search.rest.TagSearch;

/**
 * @author mwallace
 * 
 * @date 6 Mar 2013
 */
@RunWith(Suite.class)
@SuiteClasses({ Search.class, MySearch.class, PeopleSearch.class,
		MyPeopleSearch.class, TagSearch.class, MyTagSearch.class,
		ApplicationSearch.class, MyApplicationSearch.class, DateSearch.class,
		MyDateSearch.class })
public class SearchRestTestSuite {
	@AfterClass
	public static void cleanup() {
	}
}