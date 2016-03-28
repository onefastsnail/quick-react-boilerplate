var React = require('react');
var PostStore = require('../../stores/PostStore');
var PostActions = require('../../actions/PostActions');

var Post = require('./Post');

var PostsController = React.createClass({

  getInitialState: function() {
      return {
          filter: PostStore.getFilter()
      };
  },

  //when we mount add a listener to the store for when it emits a change event, we then use that callback to trigger a state change which causes our app to REACT booom! :D enjoy.
  componentDidMount: function(){
    PostStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    PostStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    //this.setState({ posts: PostStore.getPosts() });
    this.setState({ filter: PostStore.getFilter() });
  },

  handleFilterChange: function(obj) {
      PostActions.filterPosts(obj);
  },

  handleQueryChange: function(e){
      this.handleFilterChange({'query': e.target.value});
  },

  render: function(){

  	var posts = [];

  	for (var i in this.state.filter.filtered) {
  		posts.push(React.createElement(Post, {key: this.state.filter.filtered[i].ID, data: this.state.filter.filtered[i]}));
  	};

    return (
      <div>
        <form action="">
          <input
              type="text"
              value={this.props.query}
              name="query"
              placeholder="Search"
              onChange={this.handleQueryChange}
              />
        </form>

        {posts}
      </div>
    )
  }
});

module.exports = PostsController;