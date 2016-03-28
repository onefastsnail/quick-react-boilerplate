var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

//actions may contain the async code as once we have the data from a promise/request we will dispatch an event to the dispatcher to trigger the store listeners to then process etc
var PostActions = {
  filterPosts: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.POSTS_FILTER_POSTS,
      data: data
    });
  },
  getPosts: function(data){

    //simple jquery ajax request to get our data
  	$.get('api/posts.json', function(result) {

      //dispatch an event to dispatcher
      AppDispatcher.handleAction({
	       actionType: appConstants.POSTS_SET_POSTS,
	       data: result
	    });

    });
    
  },
};

module.exports = PostActions;