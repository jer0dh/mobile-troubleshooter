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
        },
        turnOff: function turnOff() {
            model.setRemote(false);
            view.hideRconsole();
        },

        turnOn: function turnOn() {
            model.setRemote(true);
            view.showRconsole();
        }

    };

    ctrl.init(r, cfg);

    var api = {
        setRemote: model.setRemote.bind(model),
        setConfig: ctrl.setConfig.bind(ctrl),
        remove: ctrl.remove.bind(ctrl),
        addStyle: view.addStyle.bind(view),
        turnOff: ctrl.turnOff.bind(ctrl),
        turnOn: ctrl.turnOn.bind(ctrl)
    };

    return api;
};

},{"./logger.model.js":3,"./logger.view.js":4}],2:[function(require,module,exports){
'use strict';

var logger = require('./logger.ctrl.js');

window.jhLogger = logger;

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

        //add initial styles
        var sheet = document.createElement('style');
        sheet.setAttribute('id', 'rconsoleStyles');
        sheet.innerHTML = '#rconsole {\n                 padding: 5px;\n                 position: fixed;\n                 width: 20%;\n                 max-height: 300px;\n                 overflow: auto;\n                 background: rgba(255,255,255,0.65);\n                 color: #000000;\n                 font-size: 12px;\n                 line-height: 1;\n                 z-index: 9999;\n             }\n            #rconsole p {\n               margin:0;\n            }';

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
        var $sheet = document.getElementById('rconsoleSheet');
        document.body.removeChild($sheet);
    },
    hideRconsole: function hideRconsole() {
        this.addStyle('display', 'none');
    },
    showRconsole: function showRconsole() {
        this.addStyle('display', 'block');
    }
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmN0cmwuanMiLCJzcmMvc2NyaXB0cy9hcHAvbG9nZ2VyLmpzIiwic3JjL3NjcmlwdHMvYXBwL2xvZ2dlci5tb2RlbC5qcyIsInNyYy9zY3JpcHRzL2FwcC9sb2dnZXIudmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0NBLElBQUksUUFBUSxRQUFRLG1CQUFSLEdBQVI7QUFDSixJQUFJLE9BQU8sUUFBUSxrQkFBUixDQUFQOztBQUdKLE9BQU8sT0FBUCxHQUFrQixVQUFTLENBQVQsRUFBWSxHQUFaLEVBQWlCOztBQUUzQixRQUFJLE9BQU87O0FBRVAsY0FBWSxjQUFTLENBQVQsRUFBWSxHQUFaLEVBQWlCO0FBQ2IsZ0JBQUksT0FBTyxDQUFQLEtBQWEsU0FBYixFQUF3QjtBQUN4QixzQkFBTSxTQUFOLENBQWdCLENBQWhCLEVBRHdCO2FBQTVCO0FBR0Esa0JBQU0sU0FBTixDQUFnQixHQUFoQixFQUphO0FBS2IsaUJBQUssSUFBTCxDQUFVLE1BQU0sU0FBTixFQUFWLEVBTGE7QUFNYixpQkFBSyxnQkFBTCxHQU5hO1NBQWpCOztBQVNaLDBCQUFrQiw0QkFBVztBQUNMLG9CQUFRLEdBQVIsR0FBYyxZQUFXOztBQUVyQixvQkFBSSxDQUFFLE1BQU0sU0FBTixFQUFGLEVBQXNCO0FBQ3RCLDBCQUFNLE1BQU4sQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEVBQTRCLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixTQUEzQixDQUE1QixFQURzQjtpQkFBMUIsTUFFTztBQUNILHlCQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLElBQXBCLEVBQTBCLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixTQUEzQixDQUExQixFQURHO2lCQUZQO2FBRlUsQ0FEVDtTQUFYO0FBVWxCLGdCQUFZ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RHVCO0tBQVg7Q0EzRWxCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vVE9ETyAtIGFkZCBhY3RpdmUgYm9vbGVhbiB3aGVyZSBvbmUgY2FuIHB1dCBiYWNrIGNvbnNvbGUubG9nLCByZW1vdmUgYW55IERPTSBhZGRlZCwgZXRjLi4uYW5kIHZpc2EgdmVyc2FcbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4vbG9nZ2VyLm1vZGVsLmpzJykoKTtcbnZhciB2aWV3ID0gcmVxdWlyZSgnLi9sb2dnZXIudmlldy5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gIGZ1bmN0aW9uKHIsIGNmZykge1xuXG4gICAgICAgIHZhciBjdHJsID0ge1xuXG4gICAgICAgICAgICBpbml0OiAgICAgICBmdW5jdGlvbihyLCBjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRSZW1vdGUocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNldENvbmZpZyhjZmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuaW5pdChtb2RlbC5nZXRDb25maWcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVDb25zb2xlTG9nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkZWZpbmVDb25zb2xlTG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBtb2RlbC5nZXRSZW1vdGUoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwub2xkTG9nLmFwcGx5KGNvbnNvbGUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmNvbnNvbGUuYXBwbHkodmlldywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6ICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVDb25zb2xlTG9nKCk7XG4gICAgICAgICAgICAgICAgdmlldy5yZW1vdmVSY29uc29sZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzdG9yZUNvbnNvbGVMb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyA9IG1vZGVsLm9sZExvZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHJlc3RvcmVDb25zb2xlTG9nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENvbmZpZzogICAgICAgICAgZnVuY3Rpb24oY2ZnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zZXRDb25maWcoY2ZnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucG9zaXRpb25SY29uc29sZShjZmcubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHVybk9mZjogICBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG1vZGVsLnNldFJlbW90ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmlldy5oaWRlUmNvbnNvbGUoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHR1cm5PbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuc2V0UmVtb3RlKHRydWUpO1xuICAgICAgICAgICAgICAgIHZpZXcuc2hvd1Jjb25zb2xlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgIGN0cmwuaW5pdChyLCBjZmcpO1xuXG5cbiAgICB2YXIgYXBpID0ge1xuICAgICAgICBzZXRSZW1vdGU6ICBtb2RlbC5zZXRSZW1vdGUuYmluZChtb2RlbCksXG4gICAgICAgIHNldENvbmZpZzogIGN0cmwuc2V0Q29uZmlnLmJpbmQoY3RybCksXG4gICAgICAgIHJlbW92ZTogY3RybC5yZW1vdmUuYmluZChjdHJsKSxcbiAgICAgICAgYWRkU3R5bGU6IHZpZXcuYWRkU3R5bGUuYmluZCh2aWV3KSxcbiAgICAgICAgdHVybk9mZjogY3RybC50dXJuT2ZmLmJpbmQoY3RybCksXG4gICAgICAgIHR1cm5PbjogY3RybC50dXJuT24uYmluZChjdHJsKVxuICAgIH07XG5cbiAgICAvL3JlbW92ZUlmKHByb2R1Y3Rpb24pXG4gICAgYXBpLl90ZXN0ID0ge307XG4gICAgYXBpLl90ZXN0Lm1vZGVsID0gbW9kZWw7XG4gICAgYXBpLl90ZXN0LnZpZXcgPSB2aWV3O1xuICAgIGFwaS5fdGVzdC5jdHJsID0gY3RybDtcbiAgICAvL2VuZFJlbW92ZUlmKHByb2R1Y3Rpb24pXG5cbiAgICByZXR1cm4gYXBpO1xuXG59O1xuIiwidmFyIGxvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyLmN0cmwuanMnKTtcblxud2luZG93LmpoTG9nZ2VyID0gbG9nZ2VyO1xuXG4iLCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIF9yZW1vdGU6ICAgICAgICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZzogICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICAgICAgICd0b3AgbGVmdCcsIC8vJ3RvcCBsZWZ0JywgJ3RvcCByaWdodCcsICdib3R0b20gbGVmdCcsIG9yICdib3R0b20gcmlnaHQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogICAgICAgICAgW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgIG9sZExvZzogICAgICAgICBjb25zb2xlLmxvZyxcblxuICAgICAgICBzZXRDb25maWc6ICAgICBmdW5jdGlvbihjZmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNmZyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb2NhdGlvbiA9IGNmZy5sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3R5bGVzID0gY2ZnLnN0eWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICBnZXRDb25maWc6ICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHNldFJlbW90ZTogICAgICBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGU9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgZ2V0UmVtb3RlOiAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fcmVtb3RlOyB9XG5cblxuICAgIH07XG59OyIsIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAkcmNvbnNvbGU6IG51bGwsXG5cbiAgICByY29uc29sZTogZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRyY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciBpbm5lciA9IHRoaXMuJHJjb25zb2xlLmlubmVySFRNTDtcbiAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLmlubmVySFRNTCA9IGlubmVyICsgJzxwPicgKyBzICsgJzwvcD4nO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgICAgLy9wcmVwYXJlIHJjb25zb2xlIGFyZWFcbiAgICAgICAgdmFyIHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jjb25zb2xlJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChyKTtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmNvbnNvbGUnKTtcblxuICAgICAgICAvL2FkZCBpbml0aWFsIHN0eWxlc1xuICAgICAgICB2YXIgc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzaGVldC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jjb25zb2xlU3R5bGVzJyk7XG4gICAgICAgIHNoZWV0LmlubmVySFRNTCA9IGAjcmNvbnNvbGUge1xuICAgICAgICAgICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICAgd2lkdGg6IDIwJTtcbiAgICAgICAgICAgICAgICAgbWF4LWhlaWdodDogMzAwcHg7XG4gICAgICAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNjUpO1xuICAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgICAgICAgICAgei1pbmRleDogOTk5OTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAjcmNvbnNvbGUgcCB7XG4gICAgICAgICAgICAgICBtYXJnaW46MDtcbiAgICAgICAgICAgIH1gO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hlZXQpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uUmNvbnNvbGUoY2ZnLmxvY2F0aW9uKTtcblxuICAgIH0sXG4gICAgcG9zaXRpb25SY29uc29sZTogZnVuY3Rpb24ocykge1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5yaWdodD1cImluaGVyaXRcIjtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cImluaGVyaXRcIjtcbiAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUudG9wPVwiaW5oZXJpdFwiO1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5ib3R0b209XCJpbmhlcml0XCI7XG4gICAgICAgIHN3aXRjaCAocykge1xuICAgICAgICAgICAgY2FzZSAndG9wIHJpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5yaWdodD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCIwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20gbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS5ib3R0b209XCIwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20gcmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLnJpZ2h0PVwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJjb25zb2xlLnN0eWxlLmJvdHRvbT1cIjBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy4kcmNvbnNvbGUuc3R5bGUubGVmdD1cIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZS50b3A9XCIwXCI7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgYWRkU3R5bGU6IGZ1bmN0aW9uKHN0eWxlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLiRyY29uc29sZS5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9LFxuICAgIHJlbW92ZVJjb25zb2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKHRoaXMuJHJjb25zb2xlKTtcbiAgICAgICAgdmFyICRzaGVldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyY29uc29sZVNoZWV0Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoJHNoZWV0KTtcbiAgICB9LFxuICAgIGhpZGVSY29uc29sZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmFkZFN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9LFxuICAgIHNob3dSY29uc29sZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmFkZFN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgfVxufTtcbiJdfQ==
