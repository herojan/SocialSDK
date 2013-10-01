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
package com.ibm.sbt.services.client.connections.forums.model;

/**
 * Class used in updating/flagging topic and reply
 * @author Swati Singh
 */


public enum FlagType {
	
	PIN("pinned"),
	UNPIN("unpin"),
	LOCK("locked"),
	UNLOCK("unlock"),
	QUESTION("question"),
	NORMAL("normal"),
	ACCEPT_ANSWER("answer"),
	DECLINE_ANSWER("decline");
	
	String flagType;
	
	private FlagType(String flagType) {
		this.flagType = flagType;
	}
	
	/**
	 * Wrapper method to return flagType type
	 * <p>
	 */
	public String getFlagType(){
		return flagType;
	}

}