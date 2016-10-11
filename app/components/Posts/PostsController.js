var React = require('react');
var PostStore = require('../../stores/PostStore');
var PostActions = require('../../actions/PostActions');

var Post = require('./Post');
var Button = require('../Button');

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
    this.setState({ filter: PostStore.getFilter() });
  },

  handleFilterChange: function(obj) {
      PostActions.filterPosts(obj);
  },

  handleQueryChange: function(e){
      this.handleFilterChange({'query': e.target.value});
  },

  handleSortChange: function(e){
      this.handleFilterChange({'sortBy': e.target.value});
  },

  handleClearFilter: function(e){
      this.handleFilterChange({'sortBy': 'newest', 'query': '', 'end': 4});
  },

  handleShowMore: function(){
      var end = this.state.filter.end + this.state.filter.perPage;
      this.handleFilterChange({'end': end});
  },

  render: function(){

  	var posts = [];

  	for (var i in this.state.filter.paginated) {
  		posts.push(React.createElement(Post, {key: this.state.filter.paginated[i].ID, data: this.state.filter.paginated[i]}));
  	};

    if(posts.length == 0) {
      posts = <p className="text-center">No posts found</p>;
    }

    var showMore;

    if(this.state.filter.filtered.length > this.state.filter.perPage && this.state.filter.end < this.state.filter.filtered.length){
      showMore = <p className="text-center"><br/><Button url="#" text="Show More" handleClick={this.handleShowMore}/></p>;
    }

    return (
      <section className="section">
        <div className="container">

            <h1 className="text-center">Posts that React</h1>
            <p className="text-center">Showing {this.state.filter.paginated.length} of {this.state.filter.filtered.length}</p>

            <div className="row">
              <div className="col-xs-12 col-sm-4 col-sm-push-8">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="search">Search</label>
                    <input name="query" type="text" className="form-control" id="search" onChange={this.handleQueryChange} value={this.state.filter.query} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sort">Sort</label>
                    <select className="form-control" id="sort" value={this.state.filter.sortBy} onChange={this.handleSortChange}>
                      <option value='newest'>Newest</option>
                      <option value='alphabetically'>Alphabetically</option>
                    </select>
                  </div>

                  <p><Button url="#" text="Clear" handleClick={this.handleClearFilter}/></p>
                </form>
              </div>
              <div className="col-xs-12 col-sm-8 col-sm-pull-4">
                {posts}

                {showMore}
              </div>
            </div>

        </div>
      </section>
    )
  }
});

module.exports = PostsController;