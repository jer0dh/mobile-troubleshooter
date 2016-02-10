var proxyquire = require('proxyquire'),
    viewStub = {};

viewStub.init = function() {return {}; };
viewStub.rconsole = function(){return {}; };
var oldConsole = console.log;


describe('model', function() {
    var model;

    beforeEach(function() {

        var logger = proxyquire('../app/logger.js',{ './logger.view.js': viewStub});
        model = logger()._test.model;

    });


    it("Initially false remote is false", function() {
        expect(model._remote).toBe(false);
    });

    it("setConfig with location set should change config", function() {
        expect(model.config.location).toBe('top left');
        model.setConfig({location: 'top right', bogus: 'test'});
        expect(model.config.location).toBe('top right');
    });
});


//document = jasmine.createSpyObj('document', ['body','createElement', 'querySelector', 'getElementById']);
//
//document.createElement.and.returnValue({});
//document.querySelector.and.returnValue({appendChild: function(){return {};}});
//document.body = {appendChild: function(){return {};}};
//document.querySelector.and.returnValue({ appendChild: function(){} });