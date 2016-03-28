var React = require('react');
var ReactDOM = require('react-dom');
var PostsController = require('./components/Posts/PostsController');

var postsEl = document.getElementById('react-posts');
if(postsEl != null){
  ReactDOM.render(
    <PostsController/>,
    postsEl
  );
}