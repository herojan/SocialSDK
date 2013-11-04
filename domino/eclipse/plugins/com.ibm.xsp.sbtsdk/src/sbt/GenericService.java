/*
 * � Copyright IBM Corp. 2011
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
package sbt;

import com.ibm.sbt.services.endpoints.Endpoint;


/**
 * Generic service.
 * @author Philippe Riand
 */
public class GenericService extends com.ibm.sbt.services.client.GenericService{

	public GenericService() {
    }
    public GenericService(Endpoint endpoint) {
        super(endpoint);
    }
    public GenericService(String endpointName) {
        super(endpointName);
    }   
}