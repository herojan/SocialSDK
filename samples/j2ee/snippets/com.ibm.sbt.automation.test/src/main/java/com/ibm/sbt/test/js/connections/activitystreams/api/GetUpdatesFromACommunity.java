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
package com.ibm.sbt.test.js.connections.activitystreams.api;

import java.util.List;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.ibm.sbt.automation.core.test.connections.BaseActivityStreamsTest;
import com.ibm.sbt.automation.core.test.connections.BaseCommunitiesTest;
import com.ibm.sbt.automation.core.test.pageobjects.JavaScriptPreviewPage;

/**
 * @author rajmeetbal
 *  
 * @date 08 May 2013
 */
public class GetUpdatesFromACommunity extends BaseActivityStreamsTest {
	
	private BaseCommunitiesTest communitiesTest = new BaseCommunitiesTest();
    
    static final String SNIPPET_ID = "Social_ActivityStreams_API_GetUpdatesFromACommunity";

    public GetUpdatesFromACommunity() {
        setAuthType(AuthType.AUTO_DETECT);
    }
    
    @Before
    public void createCommunity() {
    	communitiesTest.createCommunity();
    }
    
    @After
    public void deleteCommunity() {
    	communitiesTest.deleteCommunity();
    }

    @Test
    public void testGetUpdatesFromACommunity() {
    	String commId = communitiesTest.getCommunity().getCommunityUuid();
    	createEntry("urn:lsid:lconn.ibm.com:communities.community:"+commId, "@all", "@all");
    	
    	addSnippetParam("CommunityService.communityUuid", commId);
        JavaScriptPreviewPage previewPage = executeSnippet(SNIPPET_ID);
        List jsonList = previewPage.getJsonList();
        Assert.assertFalse("GetUpdatesFromACommunity returned no results", jsonList.isEmpty());
    }

}
