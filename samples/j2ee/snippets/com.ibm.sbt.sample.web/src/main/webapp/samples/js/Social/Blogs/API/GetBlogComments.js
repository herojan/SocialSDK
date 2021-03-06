require(["sbt/connections/BlogService", "sbt/dom", "sbt/json"], 	
    function(BlogService, dom, json) {
        var blogService = new BlogService(); 
        var now = new Date();
        var post = blogService.newBlogPost();
        post.setTitle("BlogPost at " + now.getTime());
        post.setContent("BlogPost Content at " + now.getTime());
        var comment = blogService.newComment();
        comment.setContent("Comment Content at " + now.getTime());
        
    	blogService.getBlogs({ ps: 1 }).then(
			function(blogs){
				post.setBlogHandle(blogs[0].getHandle());
				return blogService.createPost(post); // returning newly created blog post
            }
    	).then(
			function(createdPost){
				comment.setBlogHandle(createdPost.getBlogHandle());
				comment.setBlogPostUuid(createdPost.getBlogPostUuid());
				return blogService.createComment(comment); // returning newly created comment
            }
    	).then(
			function(createdComment){
				return blogService.getBlogComments(createdComment.getBlogHandle(),{ps:5});
            }
    	).then(
    		function(comments) {
                dom.setText("json", json.jsonBeanStringify(comments));
            },
            function(error) {
                dom.setText("json", json.jsonBeanStringify(error));
            }
        );
	}
);