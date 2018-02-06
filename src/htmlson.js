/*
 * htmlson.js 0.1 (Adalen VLADI) | MIT 
 * Github: https://github.com/adalenv/htmlson
 */

(function($) {

  $.fn.htmlson = function(data, options,debug) {

  	if (debug=='debug') {
  		log=function(l){
  			console.log(l);
  		}
  	} else {
  		log=function(log){

  		};
  	}

  	log('debug: true');

	  var obj = data;

    if (typeof obj === "string") {

    	obj = $.parseJSON(obj);

    }

    log('object: '+JSON.stringify(obj));
    log('object depth: '+getDepth(obj))
  	log('headers set: '+JSON.stringify(options));

    this.addClass('htmlson-active');

    var keys =Object.keys(obj[0]);

    log('auto headers: '+JSON.stringify(keys));

    var thead=`<thead>`;

    for (var i = 0; i < keys.length; i++) {

      if(options[i]==undefined){

        thead+=`<th>${keys[i]}</th>`;
      } else{
        thead+=`<th>${options[i]}</th>`;
      }

    }

    thead+=`</thead>`;

    log('table head: '+thead);

    tbody=`<tbody>`;

    for (let i in obj) {

    	tbody+=`<tr>`;

	    let array = $.map(obj[i], function(value, index) { return value; });

	    for (let i in array){

	    	if(!isObject(array[i])){

	    		tbody+=`<td>${array[i]}</td>`

	    	} else{
            tbody+=`<td><ul>`;
            let ob = $.map(array[i], function(value, index) { return value; });
            for (let i in ob) {
                tbody+=`<li>${ob[i]}</li>`;
            }
            tbody+=`</ul></td>`;

        }

	    }	

		tbody+=`</tr>`;

    }

    tbody+=`</tbody>`;

	log('table body: '+thead);

	this.html(thead+tbody);


  };

}(jQuery));

function isObject (value) {

	return value && typeof value === 'object' && value.constructor === Object;

};

getDepth = function (obj) {
    var depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            var tmpDepth = getDepth(d)
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        })
    }
    return 1 + depth
}