'use strict';
require('../'); // Load the module
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;

var transport = require('../');

describe('lasso-modules-client/transport/registerRemapCode' , function() {
    it('should generate correct code', function() {
        var code = transport.registerRemapCode('/foo@1.0.0/lib/index', 'index_browser');
        expect(code).to.equal('$rmod.remap("/foo@1.0.0/lib/index", "index_browser");');
    });
});

