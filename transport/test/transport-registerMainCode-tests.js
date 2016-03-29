'use strict';

var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;

var transport = require('../');

describe('lasso-modules-client/transport/registerMainCode' , function() {

    it('should generate correct code', function() {
        var code = transport.registerMainCode('/foo@1.0.0', 'lib/index');
        expect(code).to.equal('$rmod.main("/foo@1.0.0", "lib/index");');
    });
});

