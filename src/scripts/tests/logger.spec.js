var proxyquire = require('proxyquire'),
    viewStub = {};

viewStub.init = function() {return {}; };
viewStub.rconsole = function(){return {}; };
var oldConsole = console.log;

describe('Testing logger ctrl aspects', function() {

    it('when not called, console.log should still be pointing to console.log', function() {
        oldConsole = console.log;
        expect( console.log === oldConsole ).toBe(true);
    });

    it('when called, console.log will be overridden ', function() {
        oldConsole = console.log;
        var model = proxyquire('../app/logger.js',{ './logger.view.js': viewStub})()._test.model;
        expect( console.log === oldConsole ).toBe(false);
    });

   it('when called with no arguments, _remote will be false', function() {
      var model = proxyquire('../app/logger.js',{ './logger.view.js': viewStub})()._test.model;
       expect(model._remote).toBe(false);
   });

    it('when called with true, _remote will be true', function() {
        var model = proxyquire('../app/logger.js',{ './logger.view.js': viewStub})(true)._test.model;
        expect(model._remote).toBe(true);
    });

    it('when called with true and location, _remote will be true and location set correctly', function() {
        var model = proxyquire('../app/logger.js',{ './logger.view.js': viewStub})(true,{location:'bottom right'})._test.model;
        expect(model._remote).toBe(true);
        expect(model.config.location).toBe('bottom right');
    });


});