var proxyquire = require('proxyquire'),
    viewStub = {};

viewStub.init = function() {return {}; };
viewStub.rconsole = function(){return {}; };


describe('Testing logger ctrl aspects', function() {
    var oldConsole;

    beforeEach(function() {
        oldConsole = console.log;
    });

    afterEach(function() {
       console.log = oldConsole;  //restore
    });

    it('when not called, console.log should still be pointing to console.log', function() {
        expect( console.log === oldConsole ).toBe(true);
    });

    it('when called, console.log will be overridden ', function() {
        var model = proxyquire('../app/logger.ctrl.js',{ './logger.view.js': viewStub})()._test.model;
        expect( console.log === oldConsole ).toBe(false);
    });

    it('deactivate() restores console.log to original', function() {
        expect( console.log === oldConsole).toBe(true);
        var logger = proxyquire('../app/logger.ctrl.js',{ './logger.view.js': viewStub})();
        expect( console.log === oldConsole ).toBe(false);
        logger.deactivate();
        expect( console.log === oldConsole).toBe(true);
    });

   it('when called with no arguments, _remote will be false', function() {
      var model = proxyquire('../app/logger.ctrl.js',{ './logger.view.js': viewStub})()._test.model;
       expect(model._remote).toBe(false);
   });

    it('when called with true, _remote will be true', function() {
        var model = proxyquire('../app/logger.ctrl.js',{ './logger.view.js': viewStub})(true)._test.model;
        expect(model._remote).toBe(true);
    });

    it('when called with true and location, _remote will be true and location set correctly', function() {
        var model = proxyquire('../app/logger.ctrl.js',{ './logger.view.js': viewStub})(true,{location:'bottom right'})._test.model;
        expect(model._remote).toBe(true);
        expect(model.config.location).toBe('bottom right');
    });

    it('setConfig, will set location set correctly', function() {

        var logger = proxyquire('../app/logger.ctrl.js',{ './logger.view.js': viewStub})();
        expect(logger._test.model.config.location).toBe('top left');
        logger.setConfig({location: 'bottom right'});
        expect(logger._test.model.config.location).toBe('bottom right');
    });
});