/*
 * htmlson.js 2.0.0 (Mirko Jovic) | MIT
 * Github: https://github.com/mirkojovic/htmlson.js
 */

(function ($) {
    $.fn.htmlson = function (configs) {
        var scope = this;
        var autoHeaderKeys = [];
        var thead = "";
        var tbody = "";
        //var exceptedColumn = [];    //to be implemented
        //var exceptedRow = [];       //to be implemented

        
        /***** Start parse configurations *****/
        if (typeof configs.data !== "object") {
            console.error("htmlson.js Error: No data passed!");
            return;
        }
        
        if (typeof configs.headers !== "object") {
            configs.headers = {};
          
        }

        if (typeof configs.debug !== "boolean") {
            configs.debug = false;
        }
        /***** End parse configurations *****/

        function initialize () {
            // validate the
            if($.isEmptyObject(configs.data)){
                // set empty table
                scope.html('');
                return;
            }

            /***** Start set headers *****/
            thead = '<thead>';

            autoHeaderKeys = Object.keys(configs.data[0]);

            for (var i = 0; i < autoHeaderKeys.length; i++) {
                if (configs.headers[i] === undefined) {
                    //if auto header.
                    
                    //create <thead> tag and add class like "header_[header_key]", for example "header_Jan"
                    thead += '<th class = "header_'+ autoHeaderKeys[i] + '">' + autoHeaderKeys[i]+'</th>';
                    
                } else {
                    //if user defined header
                    
                    // create <thead> tag and add class like "header_[header_key]", for example "header_Custom"
                    thead += '<th class = "header_'+ configs.headers[i] + '">' + configs.headers[i]+'</th>';
                }
            }

            thead += '</thead>';
            /***** End set headers *****/

            /***** Start set body *****/
            tbody = '<tbody>';

            for (var i in configs.data) {
                // add class like "row_[row_index]", for example "row_0"
                tbody += '<tr class = "row_'+ i +'">';
                    

                var array = $.map(configs.data[i], function (value, index) {
                    return value;
                });

                for (var j in array) {
                    if (!isObject(array[j])) {                      //if not object
                        tbody += '<td>'+array[j]+'</td>'
                    } else {                                        //if object convert to ul
                        tbody += '<td><ul>';
                        var ob = $.map(array[j], function (value, index) {
                            return value;
                        });
                        for (var h in ob) {
                            tbody += '<li>'+ob[h]+'</li>';
                        }
                        tbody += '</ul></td>';
                    }
                }

                tbody += '</tr>';
            }

            tbody += '</tbody>';

            /***** End set body *****/

            /***** Start generate output *****/
            scope.html(thead + tbody);
            /***** End generate output *****/
        }

        initialize();

        /**
         * Add new row on table
         *
         * @param object
         */
        scope.addRow = function (object) {
            if (isObject(object) === false) {
                console.error("htmlson.js Error: New row must be of type object!");
                return;
            }

            configs.data.push(object);

            // restart table rendering
            initialize();
        };

        /**
         * Add new row on table
         *
         * @param index
         */
        scope.removeRow = function (index) {
            if(typeof configs.data[index] === "undefined"){
                console.error("htmlson.js Error: invalid!");
                return;
            }

            configs.data.splice(index, 1);

            // restart table rendering
            initialize();
        };


        /***** Start debug *****/
        if (configs.debug) {
            var log = function (l) {
                console.log(l);
            };

            log('debug: true');
            log('object: ' + JSON.stringify(configs.data));
            log('object depth: ' + getDepth(configs.data))
            log('auto headers: ' + JSON.stringify(autoHeaderKeys));
            log('headers set: ' + JSON.stringify(configs.headers));
            log('table head: ' + thead );
            log("-----");
            log('table body: ' + tbody);
            log("-----");
        }
        /***** End debug *****/

        /***** Helper methods *****/
        function isObject(value) {
            return value && typeof value === 'object' && value.constructor === Object;
        }

        function getDepth(obj) {
            var depth = 0;
            if (obj.children) {
                obj.children.forEach(function (d) {
                    var tmpDepth = getDepth(d);

                    if (tmpDepth > depth) {
                        depth = tmpDepth
                    }
                })
            }
            return 1 + depth
        }
        /***** Helper methods *****/

        return scope;
    };
}(jQuery));