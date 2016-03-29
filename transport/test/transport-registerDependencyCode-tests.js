'use strict';
require('../'); // Load the module
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;

var transport = require('../');

describe('lasso-modules-client/transport/registerDependencyCode' , function() {


    it('should generate correct dependency code for top-level dependency', function() {
        var code = transport.registerDependencyCode('', 'foo', '1.0.0');
        expect(code).to.equal('$rmod.dep("", "foo", "1.0.0");');
    });

    it('should generate correct dependency code for nested dependency', function() {
        var code = transport.registerDependencyCode('/node_modules/foo', 'baz', '3.0.0');
        expect(code).to.equal('$rmod.dep("/node_modules/foo", "baz", "3.0.0");');
    });

    it('should generate correct dependency code for dependency with an alternate name', function() {
        var code = transport.registerDependencyCode('', 'foo', '1.0.0', 'foo-browserify');
        expect(code).to.equal('$rmod.dep("", "foo-browserify", "1.0.0", "foo");');
    });
});

