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
    api._test.view = view;
    api._test.ctrl = ctrl;
    /*--end for testing */

    return api;

};
