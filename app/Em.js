var Em = {};

Em.orderArrayByDate = function(arr, key, order){

	if(typeof(order) === 'undefined'){
		order = 'desc';
	}

	return arr.sort(function(x, y) {
		if(order == 'asc'){
			return x[key] - y[key];
		}
		else {
			return y[key] - x[key];
		}
	    
	});

};

Em.stringContains = function(value, item){
	return item.toLowerCase().indexOf(value.toLowerCase()) != -1;
};

Em.objHasValue = function(obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] == value;
};

Em.getCurrentTimestamp = function(){
	return Math.floor(Date.now() / 1000);
};

Em.isExternalUrl = function(url) {
	//console.log([1, url]); 
    var domain = function(url) {
        return url.replace('http://','').replace('https://','').split('/')[0];
    };

    return domain(location.href) !== domain(url);
}

Em.OpenInNewTab = function(url) {
  var win = window.open(url, '_blank');
  win.focus();
};

Em.searchWPObj = function(item, query){

	if(query == ''){
		return true;
	}

	var chunks = query.split(" "); //split into seperate words for comparison
	var pass = false;

	//loop all the chunks
	for (var j = 0; j < chunks.length; j++) {

	    //if found no more logic needed for now
	    if(pass == true){
	        break;
	    }

	    //if chunk is a space lets skip
	    if(chunks[j] == ''){
	        continue;
	    }

	    //for basic lets check if string is in the title
	    if (item.post.post_title.toLowerCase().indexOf(chunks[j].toLowerCase()) > -1) {
	       pass = true;
	    }
	}

	return pass;

};

Em.createCookie = function(name,value,days) {
	
	if(typeof(days) === 'undefined'){
		days = 2;
	}

  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
};


Em.getCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};

// http://davidwalsh.name/javascript-debounce-function
Em.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

module.exports = Em;