(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//TODO - add active boolean where one can put back console.log, remove any DOM added, etc...and visa versa
var model = require('./logger.model.js')();
var view = require('./logger.view.js');

module.exports = function (r, cfg) {

    var ctrl = {

        init: function init(r, cfg) {
            if (typeof r === 'boolean') {
                model.setRemote(r);
            }
            model.setConfig(cfg);
            view.init(model.getConfig());
            this.defineConsoleLog();
        },

        defineConsoleLog: function defineConsoleLog() {
            console.log = function () {

                if (!model.getRemote()) {
                    model.oldLog.apply(console, Array.prototype.slice.call(arguments));
                } else {
                    view.rconsole.apply(view, Array.prototype.slice.call(arguments));
                }
            };
        },
        remove: function remove() {
            this.restoreConsoleLog();
            view.removeRconsole();
        },

        restoreConsoleLog: function restoreConsoleLog() {
            console.log = model.oldLog;
            console.log('finished restoreConsoleLog');
        },
        setConfig: function setConfig(cfg) {
            model.setConfig(cfg);
            view.positionRconsole(cfg.location);
        }

    };

    ctrl.init(r, cfg);

    var api = {
        setRemote: model.setRemote.bind(model),
        setConfig: ctrl.setConfig.bind(ctrl),
        remove: ctrl.remove.bind(ctrl),
        addStyle: view.addStyle.bind(view)
    };

    return api;
};

},{"./logger.model.js":3,"./logger.view.js":4}],2:[function(require,module,exports){
'use strict';

var logger = require('./logger.ctrl.js');

window.logger = logger;

},{"./logger.ctrl.js":1}],3:[function(require,module,exports){
'use strict';

module.exports = function () {
    return {
        _remote: false,
        config: {
            location: 'top left', //'top left', 'top right', 'bottom left', or 'bottom right'
            styles: []
        },

        oldLog: console.log,

        setConfig: function setConfig(cfg) {
            if (typeof cfg !== 'undefined') {
                if (cfg.location) {
                    this.config.location = cfg.location;
                }
                if (cfg.styles) {
                    this.config.styles = cfg.styles;
                }
            }
        },

        getConfig: function getConfig() {
            return this.config;
        },
        setRemote: function setRemote(b) {
            if (b) {

                this._remote = true;
            } else {

                this._remote = false;
            }
        },
        getRemote: function getRemote() {
            return this._remote;
        }

    };
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
    $rconsole: null,

    rconsole: function rconsole(s) {
        if (typeof this.$rconsole !== 'undefined') {
            var inner = this.$rconsole.innerHTML;
            this.$rconsole.innerHTML = inner + '<p>' + s + '</p>';
        }
    },

    init: function init(cfg) {
        //prepare rconsole area
        var r = document.createElement('div');
        r.setAttribute('id', 'rconsole');
        document.querySelector('body').appendChild(r);
        this.$rconsole = document.getElementById('rconsole');

        console.log(this.$rconsole);

        //add initial styles
        var sheet = document.createElement('style');
        sheet.innerHTML = "#rconsole { " + "     padding: 5px; " + "     position: fixed; " + "     width: 20%; " + "     max-height: 300px; " + "     overflow: auto; " + "     background: rgba(255,255,255,0.65); " + "     color: #000000; " + "     font-size: 12px; " + "     line-height: 1; " + "     z-index: 9999; " + " }" + "#rconsole p {" + "   margin:0;" + "}";

        document.body.appendChild(sheet);
        this.positionRconsole(cfg.location);
    },
    positionRconsole: function positionRconsole(s) {
        this.$rconsole.style.right = "inherit";
        this.$rconsole.style.left = "inherit";
        this.$rconsole.style.top = "inherit";
        this.$rconsole.style.bottom = "inherit";
        switch (s) {
            case 'top right':
                this.$rconsole.style.right = "0";
                this.$rconsole.style.top = "0";
                break;
            case 'bottom left':
                this.$rconsole.style.left = "0";
                this.$rconsole.style.bottom = "0";
                break;
            case 'bottom right':
                this.$rconsole.style.right = "0";
                this.$rconsole.style.bottom = "0";
                break;
            default:
                this.$rconsole.style.left = "0";
                this.$rconsole.style.top = "0";
        }
    },
    addStyle: function addStyle(style, value) {
        this.$rconsole.style[style] = value;
    },
    removeRconsole: function removeRconsole() {
        document.querySelector('body').removeChild(this.$rconsole);
    }
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmN0cmwuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmpzIiwic3JjL3NjcmlwdHMvYXBwL2xvZ2dlci5tb2RlbC5qcyIsInNyYy9zY3JpcHRzL2FwcC9sb2dnZXIudmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0NBLElBQUksUUFBUSxRQUFRLG1CQUFSLEdBQVI7QUFDSixJQUFJLE9BQU8sUUFBUSxrQkFBUixDQUFQOztBQUdKLE9BQU8sT0FBUCxHQUFrQixVQUFTLENBQVQsRUFBWSxHQUFaLEVBQWlCOztBQUUzQixRQUFJLE9BQU87O0FBRVAsY0FBWSxjQUFTLENBQVQsRUFBWSxHQUFaLEVBQWlCO0FBQ2IsZ0JBQUksT0FBTyxDQUFQLEtBQWEsU0FBYixFQUF3QjtBQUN4QixzQkFBTSxTQUFOLENBQWdCLENBQWhCLEVBRHdCO2FBQTVCO0FBR0Esa0JBQU0sU0FBTixDQUFnQixHQUFoQixFQUphO0FBS2IsaUJBQUssSUFBTCxDQUFVLE1BQU0sU0FBTixFQUFWLEVBTGE7QUFNYixpQkFBSyxnQkFBTCxHQU5hO1NBQWpCOztBQVNaLDBCQUFrQiw0QkFBVztBQUNMLG9CQUFRLEdBQVIsR0FBYyxZQUFXOztBQUVyQixvQkFBSSxDQUFFLE1BQU0sU0FBTixFQUFGLEVBQXNCO0FBQ3RCLDBCQUFNLE1BQU4sQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEVBQTRCLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixTQUEzQixDQUE1QixFQURzQjtpQkFBMUIsTUFFTztBQUNILHlCQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLElBQXBCLEVBQTBCLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixTQUEzQixDQUExQixFQURHO2lCQUZQO2FBRlUsQ0FEVDtTQUFYO0FBVWxCLGdCQUFZ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SSxxQkFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixJQUFyQixHQUEwQixHQUExQixDQURKO0FBRUkscUJBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsTUFBckIsR0FBNEIsR0FBNUIsQ0FGSjtBQUdJLHNCQUhKO0FBTEosaUJBU1MsY0FBTDtBQUNJLHFCQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLEtBQXJCLEdBQTJCLEdBQTNCLENBREo7QUFFSSxxQkFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixNQUFyQixHQUE0QixHQUE1QixDQUZKO0FBR0ksc0JBSEo7QUFUSjtBQWNRLHFCQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLElBQXJCLEdBQTBCLEdBQTFCLENBREo7QUFFSSxxQkFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixHQUFyQixHQUF5QixHQUF6QixDQUZKO0FBYkosU0FMMEI7S0FBWjtBQXdCbEIsY0FBVSxrQkFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCO0FBQzdCLGFBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsS0FBckIsSUFBOEIsS0FBOUIsQ0FENkI7S0FBdkI7QUFHVixvQkFBZ0IsMEJBQVc7QUFDdkIsaUJBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQixXQUEvQixDQUEyQyxLQUFLLFNBQUwsQ0FBM0MsQ0FEdUI7S0FBWDtDQXBFcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9UT0RPIC0gYWRkIGFjdGl2ZSBib29sZWFuIHdoZXJlIG9uZSBjYW4gcHV0IGJhY2sgY29uc29sZS5sb2csIHJlbW92ZSBhbnkgRE9NIGFkZGVkLCBldGMuLi5hbmQgdmlzYSB2ZXJzYVxudmFyIG1vZGVsID0gcmVxdWlyZSgnLi9sb2dnZXIubW9kZWwuanMnKSgpO1xudmFyIHZpZXcgPSByZXF1aXJlKCcuL2xvZ2dlci52aWV3LmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24ociwgY2ZnKSB7XG5cbiAgICAgICAgdmFyIGN0cmwgPSB7XG5cbiAgICAgICAgICAgIGluaXQ6ICAgICAgIGZ1bmN0aW9uKHIsIGNmZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldFJlbW90ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0Q29uZmlnKGNmZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5pbml0KG1vZGVsLmdldENvbmZpZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZUNvbnNvbGVMb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRlZmluZUNvbnNvbGVMb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIG1vZGVsLmdldFJlbW90ZSgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5vbGRMb2cuYXBwbHkoY29uc29sZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yY29uc29sZS5hcHBseSh2aWV3LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUNvbnNvbGVMb2coKTtcbiAgICAgICAgICAgICAgICB2aWV3LnJlbW92ZVJjb25zb2xlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXN0b3JlQ29uc29sZUxvZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gbW9kZWwub2xkTG9nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcmVzdG9yZUNvbnNvbGVMb2cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q29uZmlnOiAgICAgICAgICBmdW5jdGlvbihjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldENvbmZpZyhjZmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5wb3NpdGlvblJjb25zb2xlKGNmZy5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgY3RybC5pbml0KHIsIGNmZyk7XG5cblxuICAgIHZhciBhcGkgPSB7XG4gICAgICAgIHNldFJlbW90ZTogIG1vZGVsLnNldFJlbW90ZS5iaW5kKG1vZGVsKSxcbiAgICAgICAgc2V0Q29uZmlnOiAgY3RybC5zZXRDb25maWcuYmluZChjdHJsKSxcbiAgICAgICAgcmVtb3ZlOiBjdHJsLnJlbW92ZS5iaW5kKGN0cmwpLFxuICAgICAgICBhZGRTdHlsZTogdmlldy5hZGRTdHlsZS5iaW5kKHZpZXcpXG4gICAgfTtcblxuICAgIC8vcmVtb3ZlSWYocHJvZHVjdGlvbilcbiAgICBhcGkuX3Rlc3QgPSB7fTtcbiAgICBhcGkuX3Rlc3QubW9kZWwgPSBtb2RlbDtcbiAgICBhcGkuX3Rlc3QudmlldyA9IHZpZXc7XG4gICAgYXBpLl90ZXN0LmN0cmwgPSBjdHJsO1xuICAgIC8vZW5kUmVtb3ZlSWYocHJvZHVjdGlvbilcblxuICAgIHJldHVybiBhcGk7XG5cbn07XG4iLCJ2YXIgbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXIuY3RybC5qcycpO1xuXG53aW5kb3cubG9nZ2VyID0gbG9nZ2VyO1xuXG4iLCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIF9yZW1vdGU6ICAgICAgICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZzogICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICAgICAgICd0b3AgbGVmdCcsIC8vJ3RvcCBsZWZ0JywgJ3RvcCByaWdodCcsICdib3R0b20gbGVmdCcsIG9yICdib3R0b20gcmlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogICAgICAgICAgW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgIG9sZExvZzogICAgICAgICBjb25zb2xlLmxvZyxcblxuICAgICAgICBzZXRDb25maWc6ICAgICBmdW5jdGlvbihjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNmZyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb2NhdGlvbiA9IGNmZy5sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3R5bGVzID0gY2ZnLnN0eWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICBnZXRDb25maWc6ICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHNldFJlbW90ZTogICAgICBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGU9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgZ2V0UmVtb3RlOiAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fcmVtb3RlOyB9XG5cblxuICAgIH07XG59OyIsIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAkcmNvbnNvbGU6IG51bGwsXG5cbiAgICByY29uc29sZTogZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRyY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBpbm5lciA9IHRoaXMuJHJjb25zb2xlLmlubmVySFRNTDtcbiAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLmlubmVySFRNTCA9IGlubmVyICsgJzxwPicgKyBzICsgJzwvcD4nO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgICAgLy9wcmVwYXJlIHJjb25zb2xlIGFyZWFcbiAgICAgICAgdmFyIHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jjb25zb2xlJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChyKTtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmNvbnNvbGUnKTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRyY29uc29sZSk7XG5cbiAgICAgICAgLy9hZGQgaW5pdGlhbCBzdHlsZXNcbiAgICAgICAgdmFyIHNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc2hlZXQuaW5uZXJIVE1MID0gXCIjcmNvbnNvbGUgeyBcIiArXG4gICAgICAgICAgICBcIiAgICAgcGFkZGluZzogNXB4OyBcIiArXG4gICAgICAgICAgICBcIiAgICAgcG9zaXRpb246IGZpeGVkOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgd2lkdGg6IDIwJTsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIG1heC1oZWlnaHQ6IDMwMHB4OyBcIiArXG4gICAgICAgICAgICBcIiAgICAgb3ZlcmZsb3c6IGF1dG87IFwiICtcbiAgICAgICAgICAgIFwiICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNjUpOyBcIiArXG4gICAgICAgICAgICBcIiAgICAgY29sb3I6ICMwMDAwMDA7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBmb250LXNpemU6IDEycHg7IFwiICtcbiAgICAgICAgICAgIFwiICAgICBsaW5lLWhlaWdodDogMTsgXCIgK1xuICAgICAgICAgICAgXCIgICAgIHotaW5kZXg6IDk5OTk7IFwiICtcbiAgICAgICAgICAgIFwiIH1cIiArXG4gICAgICAgICAgICBcIiNyY29uc29sZSBwIHtcIiArXG4gICAgICAgICAgICBcIiAgIG1hcmdpbjowO1wiICtcbiAgICAgICAgICAgIFwifVwiO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hlZXQpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmNvbnNvbGUoY2ZnLmxvY2F0aW9uKTtcblxuICAgIH0sXG4gICAgcG9zaXRpb25SY29uc29sZTogZnVuY3Rpb24ocykge1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5yaWdodD1cImluaGVyaXRcIjtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cImluaGVyaXRcIjtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUudG9wPVwiaW5oZXJpdFwiO1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5ib3R0b209XCJpbmhlcml0XCI7XG4gICAgICAgIHN3aXRjaCAocykge1xuICAgICAgICAgICAgY2FzZSAndG9wIHJpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5yaWdodD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCIwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20gbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5ib3R0b209XCIwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20gcmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnJpZ2h0PVwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLmJvdHRvbT1cIjBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCIwXCI7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgYWRkU3R5bGU6IGZ1bmN0aW9uKHN0eWxlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9LFxuICAgIHJlbW92ZVJjb25zb2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKHRoaXMuJHJjb25zb2xlKTtcbiAgICB9XG59O1xuIl19
