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
/**
 * Social Business Toolkit SDK. Definition of constants for ActivityService.
 */
define([ "../lang", "./ConnectionsConstants" ], function(lang, conn) {

	return lang.mixin({

		/**
		* Namespaces to be used when reading the Activities ATOM entry or feed
		*/
		ActivityNamespaces : {	
			a 	:  conn.Namespaces.a,
			app : conn.Namespaces.app,
			thr :  conn.Namespaces.thr,			
			snx :  conn.Namespaces.snx			
		},

		/**
		 * Map to store all possible types of activity node entry types
		 */
		ActivityNodeTypes : {
			Activity : "activity",
			Chat : "chat",
			Email : "email",
			Entry : "entry",
			EntryTemplate : "entrytemplate",
			Reply : "reply",
			Section : "section",
			ToDo : "todo"
		},

		/**
		 * XPath expressions used when parsing a Connections Activities ATOM feed
		 */
		ActivitiesFeedXPath : conn.ConnectionsFeedXPath,

		/**
		 * XPath expressions for Person Fields
		 */
		PersonFieldXPath : {
			name : "a:name",
			userId : "snx:userid",
			email : "a:email"

		},

		/**
		 * XPath expressions for File Fields
		 */
		FileFieldXPath : {
			url : "a:link[@rel='enclosure']/@href",
			type : "a:link[@rel='enclosure']/@type",
			size : "a:link[@rel='enclosure']/@size",
			length : "a:link/@length"
		},

		/**
		 * XPath expressions for Link Fields
		 */
		LinkFieldXPath : {
			url : "a:link/@href",
			title : "a:link/@title"
		},

		/**
		 * XPath expressions for Text Fields
		 */
		TextFieldXPath : {
			summary : "a:summary"
		},

		
		/**
		 * XPath expressions to be used when reading an activity Node entry
		 * 
		 */
		ActivityNodeXPath :  lang.mixin({}, conn.AtomEntryXPath, {

			activityUuid : "snx:activity",

			categoryFlagCompleted : "a:category[@term='completed']/@label",
			categoryFlagTemplate : "a:category[@term='template']/@label",
			categoryFlagDelete : "a:category[@term='deleted']/@label",

			authorLdapid : "a:author/snx:ldapid",
			contributorLdapid : "a:contributor/snx:ldapid",

			type : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@label",
			priority : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/priority']/@label",

			coummunityUuid : "snx:communityUuid",
			communityUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/container']/@href",

			dueDate : "snx:duedate",
			membersUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/member-list']/@href",
			historyUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/history']/@href",
			templatesUrl : "a:link[@rel='http://www.ibm.com/xmlns/prod/sn/templates']/@href",

			position : "snx:position",
			depth : "snx:depth",
			permissions : "snx:permissions",
			iconUrl : "snx:icon",

			tags : "a:category[not(@scheme)]/@term",

			inReplyToId : "thr:in-reply-to/@ref",
			inReplyToUrl : "thr:in-reply-to/@href",
			inReplyToActivity : "thr:in-reply-to/snx:activity",

			assignedToName : "snx:assignedto/@name",
			assignedToUserId : "snx:assignedto/@userid",
			assignedToEmail : "snx:assignedto",

			textFields : "snx:field[@type='text']",
			linkFields : "snx:field[@type='link']",
			personFields : "snx:field[@type='person']",
			dateFields : "snx:field[@type='date']",
			fileFields : "snx:field[@type='file']"

		}),

		/**
		 * XPath expressions to be used when reading an Tag Node entry
		 */
		TagXPath : {
			term : "@term",
			frequency : "@snx:frequency",
			entries : "app:categories/a:category",
			uid : "@term",
			bin : "@snx:bin"
		},
		
		/**
         * XPath expressions to be used when reading a Community Member Entry
         * 
         * @property MemberXPath
         * @type Object
         * @for sbt.connections.ActivityService
         */
        MemberXPath : lang.mixin({}, conn.AtomEntryXPath, {
        	entry : "a:feed/a:entry",
        	id : "a:id",
            uid : "a:id",
            role : "snx:role",
            permissions : "snx:permissions",
            category : "a:category[@scheme='http://www.ibm.com/xmlns/prod/sn/type']/@term"
        }),

		/**
		 * Search for content in all of the activities, both completed and active, that matches a specific criteria.
		 */
		AtomActivitiesEverything : "/${activities}/service/atom2/everything",

		/**
		 * Get a feed of all active activities that match a specific criteria.
		 */
		AtomActivitiesMy : "${activities}/service/atom2/activities",

		/**
		 * Get a feed of all active activities in trash
		 */
		AtomActivitiesTrash : "${activities}/service/atom2/trash",

		/**
		 * Search for a set of completed activities that match a specific criteria.
		 */
		AtomActivitiesCompleted : "${activities}/service/atom2/completed",

		/**
		 * Get Activity node feed
		 */
		AtomActivityNode : "${activities}/service/atom2/activitynode",

		/**
		 * Get feed of all Activity Nodes in an Activity
		 */
		AtomActivityNodes : "${activities}/service/atom2/descendants", // ?nodeUuid="

		/**
		 * Get Activity Node feed from Trash
		 */
		AtomActivityNodeTrash : "${activities}/service/atom2/trashednode",

		/**
		 * Create a new Activity
		 */
		AtomCreateActivityNode : "${activities}/service/atom2/activity",

		/**
		 * Get a Feeds of all ToDo Entries in an activity
		 */
		AtomActivitiesToDos : "${activities}/service/atom2/todos",

		/**
		 * Get a feed of Activity Members
		 */
		AtomActivitiesMembers : "${activities}/service/atom2/acl",

		/**
		 * Get a member for an activity
		 */
		AtomActivitiesMember : "${activities}/service/atom2/acl?activityUuid={activityUuid}&amp;memberid={memberId}",

		/**
		 * Get all tags for an activity
		 */
		AtomActivitiesTags : "${activities}/service/atom2/tags"

	}, conn);
});