package com.ibm.sbt.test.lib;
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



import org.apache.http.impl.client.DefaultHttpClient;

import com.ibm.commons.util.StringUtil;
import com.ibm.sbt.services.client.ClientService;
import com.ibm.sbt.services.client.ClientServicesException;
import com.ibm.sbt.services.endpoints.AbstractEndpoint;
import com.ibm.sbt.services.endpoints.BasicEndpoint;
import com.ibm.sbt.services.endpoints.Endpoint;
import com.ibm.sbt.services.endpoints.EndpointFactory;

/**
 * 
 * @author Carlos Manias
 * 
 */
public class MockEndpoint extends BasicEndpoint {
	private Endpoint endpoint;
	private String innerEndpoint;
	private String mockMode;
	private boolean authenticated = true;

	public MockEndpoint() {
		super();		
	}

	public MockEndpoint(Endpoint endpoint) {
		this.endpoint = endpoint;
	}

	public void setAuthenticated(boolean authenticated){
		this.authenticated = authenticated;
	}

	@Override
	public boolean isAuthenticated(){
		return authenticated;
	}
	
	@Override
	public ClientService getClientService() throws ClientServicesException {
		Endpoint ep = endpoint != null ? endpoint : EndpointFactory
				.getEndpoint(innerEndpoint);
		if (StringUtil.isNotEmpty(this.getUrl()) && ep instanceof AbstractEndpoint) {
			((AbstractEndpoint)ep).setUrl(this.getUrl());
		}
		if (ep instanceof BasicEndpoint) {
			if(StringUtil.isNotEmpty(this.getUser()))  ((BasicEndpoint)ep).setUser(this.getUser());
			if(StringUtil.isNotEmpty(this.getPassword())) ((BasicEndpoint)ep).setPassword(this.getPassword());
		}
		return new MockService(ep.getClientService(), mockMode);
	}

	public String getInnerEndpoint() {
		return innerEndpoint;
	}

	public void setInnerEndpoint(String innerEndpoint) {
		this.innerEndpoint = innerEndpoint;
	}

	public String getMockMode() {
		return mockMode;
	}

	public void setMockMode(String mockMode) {
		this.mockMode = mockMode;
	}

	@Override
	public void initialize(DefaultHttpClient httpClient)
			throws ClientServicesException {
		if (TestEnvironment.getRequiresAuthentication()) {
			endpoint.initialize(httpClient);
		}
	}

}
