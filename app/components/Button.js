var React = require('react');

//a simple component that triggers an action such as add an item, search field, date selection etc
var Button = React.createClass({

  getDefaultProps: function() {
    return {
      href: '#',
      className: 'btn btn-primary',
      text: 'Button',
    };
  },
  
  //a handle function to stop page jumps etc, and some other default handler actions
  handle: function(e){
  	e.preventDefault();

    if(typeof(this.props.handleClick) !== 'undefined'){
      return this.props.handleClick();
    }
    else if(typeof(this.props.url) !== 'undefined'){
        
        var a = new RegExp('/' + window.location.host + '/');

        if(!a.test(this.props.url)){
          var win = window.open(this.props.url, '_blank');
          win.focus();
        }
        else {
          window.location.href = this.props.url;
        }
    }
    else {
      return true;
    }
  	
  },

  render: function() {
    return (
      <a href={this.props.url} className={this.props.className} onClick={this.handle}>{this.props.text}</a>
    );
  }
});

module.exports = Button;