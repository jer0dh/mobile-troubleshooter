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
            deactivate:     function() {
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
        setConfig:  model.setConfig.bind(model),
        deactivate: ctrl.deactivate.bind(ctrl)
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

    removeRconsole: function() {
        document.querySelector('body').removeChild(this.$rconsole);
    }
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmN0cmwuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmpzIiwic3JjL3NjcmlwdHMvYXBwL2xvZ2dlci5tb2RlbC5qcyIsInNyYy9zY3JpcHRzL2FwcC9sb2dnZXIudmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL1RPRE8gLSBhZGQgYWN0aXZlIGJvb2xlYW4gd2hlcmUgb25lIGNhbiBwdXQgYmFjayBjb25zb2xlLmxvZywgcmVtb3ZlIGFueSBET00gYWRkZWQsIGV0Yy4uLmFuZCB2aXNhIHZlcnNhXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuL2xvZ2dlci5tb2RlbC5qcycpKCk7XG52YXIgdmlldyA9IHJlcXVpcmUoJy4vbG9nZ2VyLnZpZXcuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9ICBmdW5jdGlvbihyLCBjZmcpIHtcblxuICAgICAgICBjdHJsID0ge1xuXG4gICAgICAgICAgICBpbml0OiAgICAgICBmdW5jdGlvbihyLCBjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRSZW1vdGUocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldENvbmZpZyhjZmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuaW5pdChtb2RlbC5nZXRDb25maWcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVDb25zb2xlTG9nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkZWZpbmVDb25zb2xlTG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBtb2RlbC5nZXRSZW1vdGUoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwub2xkTG9nLmFwcGx5KGNvbnNvbGUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmNvbnNvbGUuYXBwbHkodmlldywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29uc29sZUxvZygpO1xuICAgICAgICAgICAgICAgIHZpZXcucmVtb3ZlUmNvbnNvbGUoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc3RvcmVDb25zb2xlTG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgPSBtb2RlbC5vbGRMb2c7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCByZXN0b3JlQ29uc29sZUxvZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDb25maWc6ICAgICAgICAgIGZ1bmN0aW9uKGNmZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0Q29uZmlnKGNmZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnBvc2l0aW9uUmNvbnNvbGUoY2ZnLmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICBjdHJsLmluaXQociwgY2ZnKTtcblxuXG4gICAgdmFyIGFwaSA9IHtcbiAgICAgICAgc2V0UmVtb3RlOiAgbW9kZWwuc2V0UmVtb3RlLmJpbmQobW9kZWwpLFxuICAgICAgICBzZXRDb25maWc6ICBtb2RlbC5zZXRDb25maWcuYmluZChtb2RlbCksXG4gICAgICAgIGRlYWN0aXZhdGU6IGN0cmwuZGVhY3RpdmF0ZS5iaW5kKGN0cmwpXG4gICAgfTtcblxuICAgIC8vcmVtb3ZlSWYocHJvZHVjdGlvbilcbiAgICBhcGkuX3Rlc3QgPSB7fTtcbiAgICBhcGkuX3Rlc3QubW9kZWwgPSBtb2RlbDtcbiAgICBhcGkuX3Rlc3QudmlldyA9IHZpZXc7XG4gICAgYXBpLl90ZXN0LmN0cmwgPSBjdHJsO1xuICAgIC8vZW5kUmVtb3ZlSWYocHJvZHVjdGlvbilcblxuICAgIHJldHVybiBhcGk7XG5cbn07XG4iLCJ2YXIgbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuY3RybC5qcycpO1xuXG53aW5kb3cubG9nZ2VyID0gbG9nZ2VyOyIsIlxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX3JlbW90ZTogICAgICAgICBmYWxzZSxcbiAgICAgICAgY29uZmlnOiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogICAgICAgJ3RvcCBsZWZ0JywgLy8ndG9wIGxlZnQnLCAndG9wIHJpZ2h0JywgJ2JvdHRvbSBsZWZ0Jywgb3IgJ2JvdHRvbSByaWdodCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiAgICAgICAgICBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgb2xkTG9nOiAgICAgICAgIGNvbnNvbGUubG9nLFxuXG4gICAgICAgIHNldENvbmZpZzogICAgIGZ1bmN0aW9uKGNmZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2ZnICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZmcubG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmxvY2F0aW9uID0gY2ZnLmxvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZmcuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHlsZXMgPSBjZmcuc3R5bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgIGdldENvbmZpZzogICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgc2V0UmVtb3RlOiAgICAgIGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZT1mYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICBnZXRSZW1vdGU6ICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9yZW1vdGU7IH1cblxuXG4gICAgfTtcbn07IiwiXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICRyY29uc29sZTogbnVsbCxcblxuICAgIHJjb25zb2xlOiBmdW5jdGlvbiAocykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuJHJjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIGlubmVyID0gdGhpcy4kcmNvbnNvbGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuaW5uZXJIVE1MID0gaW5uZXIgKyAnPHA+JyArIHMgKyAnPC9wPic7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuICAgICAgICAvL3ByZXBhcmUgcmNvbnNvbGUgYXJlYVxuICAgICAgICB2YXIgciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByLnNldEF0dHJpYnV0ZSgnaWQnLCAncmNvbnNvbGUnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHIpO1xuICAgICAgICB0aGlzLiRyY29uc29sZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyY29uc29sZScpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHJjb25zb2xlKTtcblxuICAgICAgICAvL2FkZCBpbml0aWFsIHN0eWxlc1xuICAgICAgICB2YXIgc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzaGVldC5pbm5lckhUTUwgPSBcIiNyY29uc29sZSB7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBwYWRkaW5nOiA1cHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBwb3NpdGlvbjogZml4ZWQ7IFwiICtcbiAgICAgICAgICAgIFwiICAgICB3aWR0aDogMjAlOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgbWF4LWhlaWdodDogMzAwcHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBvdmVyZmxvdzogYXV0bzsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC42NSk7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBjb2xvcjogIzAwMDAwMDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGZvbnQtc2l6ZTogMTJweDsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIGxpbmUtaGVpZ2h0OiAxOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgei1pbmRleDogOTk5OTsgXCIgK1xuICAgICAgICAgICAgXCIgfVwiICtcbiAgICAgICAgICAgIFwiI3Jjb25zb2xlIHAge1wiICtcbiAgICAgICAgICAgIFwiICAgbWFyZ2luOjA7XCIgK1xuICAgICAgICAgICAgXCJ9XCI7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaGVldCk7XG4gICAgICAgIHRoaXMucG9zaXRpb25SY29uc29sZShjZmcubG9jYXRpb24pO1xuXG4gICAgfSxcbiAgICBwb3NpdGlvblJjb25zb2xlOiBmdW5jdGlvbihzKSB7XG4gICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnJpZ2h0PVwiaW5oZXJpdFwiO1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5sZWZ0PVwiaW5oZXJpdFwiO1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCJpbmhlcml0XCI7XG4gICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLmJvdHRvbT1cImluaGVyaXRcIjtcbiAgICAgICAgc3dpdGNoIChzKSB7XG4gICAgICAgICAgICBjYXNlICd0b3AgcmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnJpZ2h0PVwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnRvcD1cIjBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSBsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5sZWZ0PVwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLmJvdHRvbT1cIjBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSByaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUucmlnaHQ9XCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUuYm90dG9tPVwiMFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5sZWZ0PVwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnRvcD1cIjBcIjtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHJlbW92ZVJjb25zb2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKHRoaXMuJHJjb25zb2xlKTtcbiAgICB9XG59O1xuIl19
