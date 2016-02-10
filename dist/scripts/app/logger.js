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
                            },

            restoreConsoleLog: function() {
                console.log = model.oldLog;
                console.log('finished restoreConsoleLog');
            }

        };

    ctrl.init(r, cfg);


    var api = {
        setRemote:  model.setRemote.bind(model),
        setConfig:  model.setConfig.bind(model),
        deactivate: ctrl.restoreConsoleLog
    };

    return api;

};

},{"./logger.model.js":3,"./logger.view.js":4}],2:[function(require,module,exports){
var logger = require('./logger.ctrl.js');


window.logger = logger;
},{"./logger.ctrl.js":1}],3:[function(require,module,exports){



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
},{}],4:[function(require,module,exports){


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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmN0cmwuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmpzIiwic3JjL3NjcmlwdHMvYXBwL2xvZ2dlci5tb2RlbC5qcyIsInNyYy9zY3JpcHRzL2FwcC9sb2dnZXIudmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9UT0RPIC0gYWRkIGFjdGl2ZSBib29sZWFuIHdoZXJlIG9uZSBjYW4gcHV0IGJhY2sgY29uc29sZS5sb2csIHJlbW92ZSBhbnkgRE9NIGFkZGVkLCBldGMuLi5hbmQgdmlzYSB2ZXJzYVxudmFyIG1vZGVsID0gcmVxdWlyZSgnLi9sb2dnZXIubW9kZWwuanMnKTtcbnZhciB2aWV3ID0gcmVxdWlyZSgnLi9sb2dnZXIudmlldy5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gIGZ1bmN0aW9uKHIsIGNmZykge1xuXG4gICAgICAgIGN0cmwgPSB7XG5cbiAgICAgICAgICAgIGluaXQ6ICAgICAgIGZ1bmN0aW9uKHIsIGNmZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldFJlbW90ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0Q29uZmlnKGNmZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVDb25zb2xlTG9nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkZWZpbmVDb25zb2xlTG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBtb2RlbC5nZXRSZW1vdGUoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwub2xkTG9nLmFwcGx5KGNvbnNvbGUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmNvbnNvbGUuYXBwbHkodmlldywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc3RvcmVDb25zb2xlTG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyA9IG1vZGVsLm9sZExvZztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcmVzdG9yZUNvbnNvbGVMb2cnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgY3RybC5pbml0KHIsIGNmZyk7XG5cblxuICAgIHZhciBhcGkgPSB7XG4gICAgICAgIHNldFJlbW90ZTogIG1vZGVsLnNldFJlbW90ZS5iaW5kKG1vZGVsKSxcbiAgICAgICAgc2V0Q29uZmlnOiAgbW9kZWwuc2V0Q29uZmlnLmJpbmQobW9kZWwpLFxuICAgICAgICBkZWFjdGl2YXRlOiBjdHJsLnJlc3RvcmVDb25zb2xlTG9nXG4gICAgfTtcblxuICAgIC8vcmVtb3ZlSWYocHJvZHVjdGlvbilcbiAgICBhcGkuX3Rlc3QgPSB7fTtcbiAgICBhcGkuX3Rlc3QubW9kZWwgPSBtb2RlbDtcbiAgICBhcGkuX3Rlc3QudmlldyA9IHZpZXc7XG4gICAgYXBpLl90ZXN0LmN0cmwgPSBjdHJsO1xuICAgIC8vZW5kUmVtb3ZlSWYocHJvZHVjdGlvbilcblxuICAgIHJldHVybiBhcGk7XG5cbn07XG4iLCJ2YXIgbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuY3RybC5qcycpO1xuXG5cbndpbmRvdy5sb2dnZXIgPSBsb2dnZXI7IiwiXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgX3JlbW90ZTogICAgICAgICBmYWxzZSxcbiAgICAgICAgY29uZmlnOiAgICAgICAgIHtcbiAgICBsb2NhdGlvbjogICAgICAgJ3RvcCBsZWZ0JywgLy8ndG9wIGxlZnQnLCAndG9wIHJpZ2h0JywgJ2JvdHRvbSBsZWZ0Jywgb3IgJ2JvdHRvbSByaWdodCdcbiAgICAgICAgc3R5bGVzOiAgICAgICAgICBbXVxufSxcblxuICAgIG9sZExvZzogICAgICAgICBjb25zb2xlLmxvZyxcblxuICAgICAgICBzZXRDb25maWc6ICAgICBmdW5jdGlvbihjZmcpIHtcbiAgICBpZiAodHlwZW9mIGNmZyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICBpZiAoY2ZnLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5sb2NhdGlvbiA9IGNmZy5sb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ZnLnN0eWxlcykge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuc3R5bGVzID0gY2ZnLnN0eWxlcztcbiAgICAgICAgfVxuICAgIH1cblxufSxcblxuICAgIHNldFJlbW90ZTogICAgICBmdW5jdGlvbihiKSB7XG4gICAgICAgIGlmKGIpIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVtb3RlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVtb3RlPWZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRSZW1vdGU6ICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9yZW1vdGU7IH1cblxuXG59IiwiXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICRyY29uc29sZTogbnVsbCxcblxuICAgIHJjb25zb2xlOiBmdW5jdGlvbiAocykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHJjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIGlubmVyID0gdGhpcy4kcmNvbnNvbGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuaW5uZXJIVE1MID0gaW5uZXIgKyAnPHA+JyArIHMgKyAnPC9wPic7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3ByZXBhcmUgcmNvbnNvbGUgYXJlYVxuICAgICAgICB2YXIgciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByLmlubmVySFRNTCA9ICc8ZGl2IGlkPVwicmNvbnNvbGVcIj48L2Rpdj4nO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQocik7XG4gICAgICAgIHRoaXMuJHJjb25zb2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jjb25zb2xlJyk7XG5cblxuICAgICAgICAvL2FkZCBpbml0aWFsIHN0eWxlc1xuICAgICAgICB2YXIgc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzaGVldC5pbm5lckhUTUwgPSBcIiNyY29uc29sZSB7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBwYWRkaW5nOiA1cHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBwb3NpdGlvbjogZml4ZWQ7IFwiICtcbiAgICAgICAgICAgIFwiICAgICB0b3A6IDA7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBsZWZ0OiAwOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgd2lkdGg6IDIwJTsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIG1heC1oZWlnaHQ6IDMwMHB4OyBcIiArXG4gICAgICAgICAgICBcIiAgICAgb3ZlcmZsb3c6IGF1dG87IFwiICtcbiAgICAgICAgICAgIFwiICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNjUpOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgY29sb3I6ICMwMDAwMDA7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBmb250LXNpemU6IDEycHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBsaW5lLWhlaWdodDogMTsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIHotaW5kZXg6IDk5OTk7IFwiICtcbiAgICAgICAgICAgIFwiIH1cIiArXG4gICAgICAgICAgICBcIiNyY29uc29sZSBwIHtcIiArXG4gICAgICAgICAgICBcIiAgIG1hcmdpbjowO1wiICtcbiAgICAgICAgICAgIFwifVwiO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hlZXQpO1xuXG4gICAgfVxufTtcbiJdfQ==
