//TODO - add active boolean where one can put back console.log, remove any DOM added, etc...and visa versa
var model = require('./logger.model.js')();
var view = require('./logger.view.js');


module.exports =  function(r, cfg) {

        var ctrl = {

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

    //removeIf(production)
    api._test = {};
    api._test.model = model;
    api._test.view = view;
    api._test.ctrl = ctrl;
    //endRemoveIf(production)

    return api;

};
