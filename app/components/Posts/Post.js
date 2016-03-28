var React = require('react');

//a simple component that triggers an action such as add an item, search field, date selection etc
var Post = React.createClass({

  componentDidMount: function(){},
  componentWillUnmount: function(){},

  render: function(){

    //console.log(this.props.data); 

    return(
      <div>
        <h1>{this.props.data.post_title}</h1>
        { /* <h3>{this.props.data.post_date}</h3>
        <div dangerouslySetInnerHTML={{__html: this.props.data.post_content}}></div> */ }
      </div>
    );

  }
});

module.exports = Post;