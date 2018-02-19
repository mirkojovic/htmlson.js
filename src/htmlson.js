/*
 * htmlson.js 0.3 (Adalen VLADI) | MIT 
 * Github: https://github.com/adalenv/htmlson.js
 */

(function($) {

  $.fn.htmlson = function(...args) {
	
    //---parse arguments---//
    var obj;
    var options=[];
    var debug;

    switch(arguments.length) {

      case 0:

        alert("htmlson.js Error: No object passed!");
        return;
        break;

      case 1:
          obj = arguments[0];
        break;

      case 2:
        obj = arguments[0];
        if (typeof arguments[1] === "object") {

          options=arguments[1];

        } else{

          debug='debug';

        }

        break; 

      case 3:

        obj = arguments[0];
        options=arguments[1];
        debug=arguments[2]

        break;     
    }

    if (typeof obj === "string") {
      obj = $.parseJSON(obj);
    }

    var keys =Object.keys(obj[0]);
    //---/parse arguments---//

    //---initialize---//
    this.addClass('htmlson-active');
    var thead=`<thead>`;
    //---/initialize---//

    //---/set headers---//
    for (var i = 0; i < keys.length; i++) {

      if(options[i]==undefined){

        thead+=`<th>${keys[i]}</th>`;//if auto

      } else{

        thead+=`<th>${options[i]}</th>`;//if user defined

      }

    }

    thead+=`</thead>`;

    //---/set headers---//

    //---set body---//
    tbody=`<tbody>`;

    for (let i in obj) {

    	tbody+=`<tr>`;

	    let array = $.map(obj[i], function(value, index) { return value; });

	    for (let i in array){

	    	if(!isObject(array[i])){//if not object

	    		tbody+=`<td>${array[i]}</td>`

	    	} else{//if object tonvert to ul
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

    //---/set body---//

    //---generate output--//
    this.html(thead+tbody);
    //---/generate output--//


    //---debug---//
    if (debug=='debug') {
      log=function(l){
        console.log(l);
      }
      log('debug: true');
      log('object: '+JSON.stringify(obj));
      log('object depth: '+getDepth(obj))
      log('auto headers: '+JSON.stringify(keys));
      log('headers set: '+JSON.stringify(options));
      log('table head: '+thead);
      log('table body: '+thead);
    } else {
      log=function(log){
      };
    }
    //---/debug---//
  };

}(jQuery));

//---functions used--//
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
//---/functions used--//