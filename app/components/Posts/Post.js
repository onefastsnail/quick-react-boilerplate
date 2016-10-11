var React = require('react');

//a simple component that triggers an action such as add an item, search field, date selection etc
var Post = React.createClass({

  componentDidMount: function(){},
  componentWillUnmount: function(){},

  render: function(){

    var excerpt = this.props.data.post_content.replace(/(<([^>]+)>)/ig,"");

    excerpt = excerpt.substring(0, 255);

    return(
      <div>
        <h3>{this.props.data.post_title}</h3>
        <p>{this.props.data.post_date}</p>
        <div dangerouslySetInnerHTML={{__html: excerpt}}></div>
      </div>
    );

  }
});

module.exports = Post;