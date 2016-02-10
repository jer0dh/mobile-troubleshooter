(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//TODO - add active boolean where one can put back console.log, remove any DOM added, etc...and visa versa
var model = require('./logger.model.js');
var view = require('./logger.view.js');


module.exports =  function(r, cfg) {

        ctrl = {

            init:       function(r, cfg) {
                            if (typeof r === 'boolean') {
                                model.setRemote(r);
                            }
                            model.setConfig(cfg);
                            view.init();
                            this.defineConsoleLog();
                        },

            defineConsoleLog: function() {
                                    console.log = function() {

                                        if (! model.getRemote() ) {
                                            model.oldLog.apply(console, Array.prototype.slice.call(arguments));
                                        } else {
                                            view.rconsole.apply(view, Array.prototype.slice.call(arguments));
                                        }
                                    }
                            }

        };

    ctrl.init(r, cfg);


    var api = {
        setRemote:  model.setRemote.bind(model),
        setConfig:  model.setConfig.bind(model)
    };

    /*--For Testing only */
    api._test = {};
    api._test.model = model;

    /*--end for testing */

    return api;

};

},{"./logger.model.js":2,"./logger.view.js":3}],2:[function(require,module,exports){



module.exports = {
    _remote:         false,
        config:         {
    location:       'top left', //'top left', 'top right', 'bottom left', or 'bottom right'
        styles:          []
},

    oldLog:         console.log,

        setConfig:     function(cfg) {
    if (typeof cfg !== 'undefined'){
        if (cfg.location) {
            this.config.location = cfg.location;
        }
        if (cfg.styles) {
            this.config.styles = cfg.styles;
        }
    }

},

    setRemote:      function(b) {
        if(b) {

            this._remote = true;
        } else {

            this._remote=false;
        }
    },
    getRemote:      function() { return this._remote; }


}
},{}],3:[function(require,module,exports){


module.exports = {
    $rconsole: null,

    rconsole: function (s) {
        if (typeof this.$rconsole !== 'undefined') {
            var inner = this.$rconsole.innerHTML;
            this.$rconsole.innerHTML = inner + '<p>' + s + '</p>';
        }
    },

    init: function () {
        //prepare rconsole area
        var r = document.createElement('div');
        r.innerHTML = '<div id="rconsole"></div>';
        document.querySelector('body').appendChild(r);
        this.$rconsole = document.getElementById('rconsole');


        //add initial styles
        var sheet = document.createElement('style');
        sheet.innerHTML = "#rconsole { " +
            "     padding: 5px; " +
            "     position: fixed; " +
            "     top: 0; " +
            "     left: 0; " +
            "     width: 20%; " +
            "     max-height: 300px; " +
            "     overflow: auto; " +
            "     background: rgba(255,255,255,0.65); " +
            "     color: #000000; " +
            "     font-size: 12px; " +
            "     line-height: 1; " +
            "     z-index: 9999; " +
            " }" +
            "#rconsole p {" +
            "   margin:0;" +
            "}";

        document.body.appendChild(sheet);

    }
};

},{}],4:[function(require,module,exports){
var logger = require('./app/logger.js');

jQuery('document').ready(function() {




    console.log('hello');
    console.log(logger);
    log = logger(true);

    console.log('world');

    for(var i = 0; i < 50 ; ++i) {
        console.log('i = ' + i);
    }
});






},{"./app/logger.js":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmpzIiwic3JjL3NjcmlwdHMvYXBwL2xvZ2dlci5tb2RlbC5qcyIsInNyYy9zY3JpcHRzL2FwcC9sb2dnZXIudmlldy5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL1RPRE8gLSBhZGQgYWN0aXZlIGJvb2xlYW4gd2hlcmUgb25lIGNhbiBwdXQgYmFjayBjb25zb2xlLmxvZywgcmVtb3ZlIGFueSBET00gYWRkZWQsIGV0Yy4uLmFuZCB2aXNhIHZlcnNhXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuL2xvZ2dlci5tb2RlbC5qcycpO1xudmFyIHZpZXcgPSByZXF1aXJlKCcuL2xvZ2dlci52aWV3LmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24ociwgY2ZnKSB7XG5cbiAgICAgICAgY3RybCA9IHtcblxuICAgICAgICAgICAgaW5pdDogICAgICAgZnVuY3Rpb24ociwgY2ZnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0UmVtb3RlKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRDb25maWcoY2ZnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZUNvbnNvbGVMb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRlZmluZUNvbnNvbGVMb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIG1vZGVsLmdldFJlbW90ZSgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5vbGRMb2cuYXBwbHkoY29uc29sZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yY29uc29sZS5hcHBseSh2aWV3LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICBjdHJsLmluaXQociwgY2ZnKTtcblxuXG4gICAgdmFyIGFwaSA9IHtcbiAgICAgICAgc2V0UmVtb3RlOiAgbW9kZWwuc2V0UmVtb3RlLmJpbmQobW9kZWwpLFxuICAgICAgICBzZXRDb25maWc6ICBtb2RlbC5zZXRDb25maWcuYmluZChtb2RlbClcbiAgICB9O1xuXG4gICAgLyotLUZvciBUZXN0aW5nIG9ubHkgKi9cbiAgICBhcGkuX3Rlc3QgPSB7fTtcbiAgICBhcGkuX3Rlc3QubW9kZWwgPSBtb2RlbDtcblxuICAgIC8qLS1lbmQgZm9yIHRlc3RpbmcgKi9cblxuICAgIHJldHVybiBhcGk7XG5cbn07XG4iLCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBfcmVtb3RlOiAgICAgICAgIGZhbHNlLFxuICAgICAgICBjb25maWc6ICAgICAgICAge1xuICAgIGxvY2F0aW9uOiAgICAgICAndG9wIGxlZnQnLCAvLyd0b3AgbGVmdCcsICd0b3AgcmlnaHQnLCAnYm90dG9tIGxlZnQnLCBvciAnYm90dG9tIHJpZ2h0J1xuICAgICAgICBzdHlsZXM6ICAgICAgICAgIFtdXG59LFxuXG4gICAgb2xkTG9nOiAgICAgICAgIGNvbnNvbGUubG9nLFxuXG4gICAgICAgIHNldENvbmZpZzogICAgIGZ1bmN0aW9uKGNmZykge1xuICAgIGlmICh0eXBlb2YgY2ZnICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIGlmIChjZmcubG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmxvY2F0aW9uID0gY2ZnLmxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZmcuc3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHlsZXMgPSBjZmcuc3R5bGVzO1xuICAgICAgICB9XG4gICAgfVxuXG59LFxuXG4gICAgc2V0UmVtb3RlOiAgICAgIGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgaWYoYikge1xuXG4gICAgICAgICAgICB0aGlzLl9yZW1vdGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9yZW1vdGU9ZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFJlbW90ZTogICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3JlbW90ZTsgfVxuXG5cbn0iLCJcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJHJjb25zb2xlOiBudWxsLFxuXG4gICAgcmNvbnNvbGU6IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy4kcmNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgaW5uZXIgPSB0aGlzLiRyY29uc29sZS5pbm5lckhUTUw7XG4gICAgICAgICAgICB0aGlzLiRyY29uc29sZS5pbm5lckhUTUwgPSBpbm5lciArICc8cD4nICsgcyArICc8L3A+JztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vcHJlcGFyZSByY29uc29sZSBhcmVhXG4gICAgICAgIHZhciByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHIuaW5uZXJIVE1MID0gJzxkaXYgaWQ9XCJyY29uc29sZVwiPjwvZGl2Pic7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChyKTtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmNvbnNvbGUnKTtcblxuXG4gICAgICAgIC8vYWRkIGluaXRpYWwgc3R5bGVzXG4gICAgICAgIHZhciBzaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHNoZWV0LmlubmVySFRNTCA9IFwiI3Jjb25zb2xlIHsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIHBhZGRpbmc6IDVweDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIHBvc2l0aW9uOiBmaXhlZDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIHRvcDogMDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGxlZnQ6IDA7IFwiICtcbiAgICAgICAgICAgIFwiICAgICB3aWR0aDogMjAlOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgbWF4LWhlaWdodDogMzAwcHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBvdmVyZmxvdzogYXV0bzsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC42NSk7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBjb2xvcjogIzAwMDAwMDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGZvbnQtc2l6ZTogMTJweDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGxpbmUtaGVpZ2h0OiAxOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgei1pbmRleDogOTk5OTsgXCIgK1xuICAgICAgICAgICAgXCIgfVwiICtcbiAgICAgICAgICAgIFwiI3Jjb25zb2xlIHAge1wiICtcbiAgICAgICAgICAgIFwiICAgbWFyZ2luOjA7XCIgK1xuICAgICAgICAgICAgXCJ9XCI7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaGVldCk7XG5cbiAgICB9XG59O1xuIiwidmFyIGxvZ2dlciA9IHJlcXVpcmUoJy4vYXBwL2xvZ2dlci5qcycpO1xuXG5qUXVlcnkoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24oKSB7XG5cblxuXG5cbiAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgICBjb25zb2xlLmxvZyhsb2dnZXIpO1xuICAgIGxvZyA9IGxvZ2dlcih0cnVlKTtcblxuICAgIGNvbnNvbGUubG9nKCd3b3JsZCcpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDUwIDsgKytpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpID0gJyArIGkpO1xuICAgIH1cbn0pO1xuXG5cblxuXG5cbiJdfQ==
