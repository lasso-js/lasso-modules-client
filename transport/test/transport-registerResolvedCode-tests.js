'use strict';
require('../'); // Load the module
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;

var transport = require('../');

describe('lasso-modules-client/transport/registerResolvedCode' , function() {
    it('should generate correct code', function() {
        var code = transport.registerResolvedCode('baz', '/src', '/$/baz/lib/index');
        expect(code).to.equal('$rmod.resolved("baz", "/src", "/$/baz/lib/index");');
    });
});

