(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//TODO - add active boolean where one can put back console.log, remove any DOM added, etc...and visa versa
var model = require('./logger.model.js')();
var view = require('./logger.view.js');


module.exports =  function(r, cfg) {

        ctrl = {

            init:       function(r, cfg) {
                            if (typeof r === 'boolean') {
                                model.setRemote(r);
                            }
                            model.setConfig(cfg);
                            view.init(model.getConfig());
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
            remove:     function() {
                this.restoreConsoleLog();
                view.removeRconsole();
            },

            restoreConsoleLog: function() {
                                console.log = model.oldLog;
                                console.log('finished restoreConsoleLog');
                            },
            setConfig:          function(cfg) {
                                    model.setConfig(cfg);
                                    view.positionRconsole(cfg.location);
                                }

        };

    ctrl.init(r, cfg);


    var api = {
        setRemote:  model.setRemote.bind(model),
        setConfig:  ctrl.setConfig.bind(ctrl),
        remove: ctrl.remove.bind(ctrl),
        addStyle: view.addStyle.bind(view)
    };

    return api;

};

},{"./logger.model.js":3,"./logger.view.js":4}],2:[function(require,module,exports){
var logger = require('./logger.ctrl.js');

window.logger = logger;
},{"./logger.ctrl.js":1}],3:[function(require,module,exports){



module.exports = function() {
    return {
        _remote:         false,
        config:            {
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

        getConfig:          function() {
                            return this.config;
                        },
        setRemote:      function(b) {
                            if(b) {

                                this._remote = true;
                            } else {

                                this._remote=false;
                            }
                        },
        getRemote:      function() { return this._remote; }


    };
};
},{}],4:[function(require,module,exports){


module.exports = {
    $rconsole: null,

    rconsole: function (s) {
        if (typeof this.$rconsole !== 'undefined') {
            var inner = this.$rconsole.innerHTML;
            this.$rconsole.innerHTML = inner + '<p>' + s + '</p>';
        }
    },

    init: function (cfg) {
        //prepare rconsole area
        var r = document.createElement('div');
        r.setAttribute('id', 'rconsole');
        document.querySelector('body').appendChild(r);
        this.$rconsole = document.getElementById('rconsole');

        console.log(this.$rconsole);

        //add initial styles
        var sheet = document.createElement('style');
        sheet.innerHTML = "#rconsole { " +
            "     padding: 5px; " +
            "     position: fixed; " +
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
        this.positionRconsole(cfg.location);

    },
    positionRconsole: function(s) {
        this.$rconsole.style.right="inherit";
        this.$rconsole.style.left="inherit";
        this.$rconsole.style.top="inherit";
        this.$rconsole.style.bottom="inherit";
        switch (s) {
            case 'top right':
                this.$rconsole.style.right="0";
                this.$rconsole.style.top="0";
                break;
            case 'bottom left':
                this.$rconsole.style.left="0";
                this.$rconsole.style.bottom="0";
                break;
            case 'bottom right':
                this.$rconsole.style.right="0";
                this.$rconsole.style.bottom="0";
                break;
            default:
                this.$rconsole.style.left="0";
                this.$rconsole.style.top="0";
        }

    },
    addStyle: function(style, value) {
        this.$rconsole.style[style] = value;
    },
    removeRconsole: function() {
        document.querySelector('body').removeChild(this.$rconsole);
    }
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmN0cmwuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmpzIiwic3JjL3NjcmlwdHMvYXBwL2xvZ2dlci5tb2RlbC5qcyIsInNyYy9zY3JpcHRzL2FwcC9sb2dnZXIudmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL1RPRE8gLSBhZGQgYWN0aXZlIGJvb2xlYW4gd2hlcmUgb25lIGNhbiBwdXQgYmFjayBjb25zb2xlLmxvZywgcmVtb3ZlIGFueSBET00gYWRkZWQsIGV0Yy4uLmFuZCB2aXNhIHZlcnNhXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuL2xvZ2dlci5tb2RlbC5qcycpKCk7XG52YXIgdmlldyA9IHJlcXVpcmUoJy4vbG9nZ2VyLnZpZXcuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9ICBmdW5jdGlvbihyLCBjZmcpIHtcblxuICAgICAgICBjdHJsID0ge1xuXG4gICAgICAgICAgICBpbml0OiAgICAgICBmdW5jdGlvbihyLCBjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRSZW1vdGUocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldENvbmZpZyhjZmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuaW5pdChtb2RlbC5nZXRDb25maWcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVDb25zb2xlTG9nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkZWZpbmVDb25zb2xlTG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBtb2RlbC5nZXRSZW1vdGUoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwub2xkTG9nLmFwcGx5KGNvbnNvbGUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmNvbnNvbGUuYXBwbHkodmlldywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6ICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVDb25zb2xlTG9nKCk7XG4gICAgICAgICAgICAgICAgdmlldy5yZW1vdmVSY29uc29sZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzdG9yZUNvbnNvbGVMb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyA9IG1vZGVsLm9sZExvZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHJlc3RvcmVDb25zb2xlTG9nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENvbmZpZzogICAgICAgICAgZnVuY3Rpb24oY2ZnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRDb25maWcoY2ZnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucG9zaXRpb25SY29uc29sZShjZmcubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgIGN0cmwuaW5pdChyLCBjZmcpO1xuXG5cbiAgICB2YXIgYXBpID0ge1xuICAgICAgICBzZXRSZW1vdGU6ICBtb2RlbC5zZXRSZW1vdGUuYmluZChtb2RlbCksXG4gICAgICAgIHNldENvbmZpZzogIGN0cmwuc2V0Q29uZmlnLmJpbmQoY3RybCksXG4gICAgICAgIHJlbW92ZTogY3RybC5yZW1vdmUuYmluZChjdHJsKSxcbiAgICAgICAgYWRkU3R5bGU6IHZpZXcuYWRkU3R5bGUuYmluZCh2aWV3KVxuICAgIH07XG5cbiAgICAvL3JlbW92ZUlmKHByb2R1Y3Rpb24pXG4gICAgYXBpLl90ZXN0ID0ge307XG4gICAgYXBpLl90ZXN0Lm1vZGVsID0gbW9kZWw7XG4gICAgYXBpLl90ZXN0LnZpZXcgPSB2aWV3O1xuICAgIGFwaS5fdGVzdC5jdHJsID0gY3RybDtcbiAgICAvL2VuZFJlbW92ZUlmKHByb2R1Y3Rpb24pXG5cbiAgICByZXR1cm4gYXBpO1xuXG59O1xuIiwidmFyIGxvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmN0cmwuanMnKTtcblxud2luZG93LmxvZ2dlciA9IGxvZ2dlcjsiLCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIF9yZW1vdGU6ICAgICAgICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZzogICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICAgICAgICd0b3AgbGVmdCcsIC8vJ3RvcCBsZWZ0JywgJ3RvcCByaWdodCcsICdib3R0b20gbGVmdCcsIG9yICdib3R0b20gcmlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogICAgICAgICAgW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgIG9sZExvZzogICAgICAgICBjb25zb2xlLmxvZyxcblxuICAgICAgICBzZXRDb25maWc6ICAgICBmdW5jdGlvbihjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNmZyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb2NhdGlvbiA9IGNmZy5sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3R5bGVzID0gY2ZnLnN0eWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICBnZXRDb25maWc6ICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHNldFJlbW90ZTogICAgICBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGU9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgZ2V0UmVtb3RlOiAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fcmVtb3RlOyB9XG5cblxuICAgIH07XG59OyIsIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAkcmNvbnNvbGU6IG51bGwsXG5cbiAgICByY29uc29sZTogZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRyY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBpbm5lciA9IHRoaXMuJHJjb25zb2xlLmlubmVySFRNTDtcbiAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLmlubmVySFRNTCA9IGlubmVyICsgJzxwPicgKyBzICsgJzwvcD4nO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgICAgLy9wcmVwYXJlIHJjb25zb2xlIGFyZWFcbiAgICAgICAgdmFyIHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jjb25zb2xlJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChyKTtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmNvbnNvbGUnKTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRyY29uc29sZSk7XG5cbiAgICAgICAgLy9hZGQgaW5pdGlhbCBzdHlsZXNcbiAgICAgICAgdmFyIHNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc2hlZXQuaW5uZXJIVE1MID0gXCIjcmNvbnNvbGUgeyBcIiArXG4gICAgICAgICAgICBcIiAgICAgcGFkZGluZzogNXB4OyBcIiArXG4gICAgICAgICAgICBcIiAgICAgcG9zaXRpb246IGZpeGVkOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgd2lkdGg6IDIwJTsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIG1heC1oZWlnaHQ6IDMwMHB4OyBcIiArXG4gICAgICAgICAgICBcIiAgICAgb3ZlcmZsb3c6IGF1dG87IFwiICtcbiAgICAgICAgICAgIFwiICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNjUpOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgY29sb3I6ICMwMDAwMDA7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBmb250LXNpemU6IDEycHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBsaW5lLWhlaWdodDogMTsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIHotaW5kZXg6IDk5OTk7IFwiICtcbiAgICAgICAgICAgIFwiIH1cIiArXG4gICAgICAgICAgICBcIiNyY29uc29sZSBwIHtcIiArXG4gICAgICAgICAgICBcIiAgIG1hcmdpbjowO1wiICtcbiAgICAgICAgICAgIFwifVwiO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hlZXQpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmNvbnNvbGUoY2ZnLmxvY2F0aW9uKTtcblxuICAgIH0sXG4gICAgcG9zaXRpb25SY29uc29sZTogZnVuY3Rpb24ocykge1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5yaWdodD1cImluaGVyaXRcIjtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cImluaGVyaXRcIjtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUudG9wPVwiaW5oZXJpdFwiO1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5ib3R0b209XCJpbmhlcml0XCI7XG4gICAgICAgIHN3aXRjaCAocykge1xuICAgICAgICAgICAgY2FzZSAndG9wIHJpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5yaWdodD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCIwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20gbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5ib3R0b209XCIwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20gcmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnJpZ2h0PVwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLmJvdHRvbT1cIjBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCIwXCI7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgYWRkU3R5bGU6IGZ1bmN0aW9uKHN0eWxlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9LFxuICAgIHJlbW92ZVJjb25zb2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKHRoaXMuJHJjb25zb2xlKTtcbiAgICB9XG59O1xuIl19
