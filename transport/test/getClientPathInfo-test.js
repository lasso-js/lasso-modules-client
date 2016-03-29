'use strict';

var nodePath = require('path');
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;

var getClientPathInfo = require('../').getClientPathInfo;

describe('getClientPathInfo' , function() {

    it('should resolve path info correctly for top-level installed modules', function() {
        var path = nodePath.join(__dirname, "fixtures/test-project/node_modules/foo/lib/index.js");
        var pathInfo = getClientPathInfo(path, {root: nodePath.join(__dirname, "fixtures/test-project")});
        expect(pathInfo).to.deep.equal({
            logicalPath: '/$/foo/lib/index',
            realPath: '/foo@1.0.0/lib/index'
        });
    });

    it('should resolve path info correctly for directories', function() {
        var path;
        var pathInfo;

        path = nodePath.join(__dirname, "fixtures/test-project/node_modules/foo");
        pathInfo = getClientPathInfo(path, {root: nodePath.join(__dirname, "fixtures/test-project")});
        expect(pathInfo).to.deep.equal({
            logicalPath: '/$/foo',
            realPath: '/foo@1.0.0'
        });

        path = nodePath.join(__dirname, "fixtures/test-project/node_modules/bar");
        pathInfo = getClientPathInfo(path, {root: nodePath.join(__dirname, "fixtures/test-project")});
        expect(pathInfo).to.deep.equal({
            logicalPath: '/$/bar',
            realPath: '/bar@2.0.0'
        });

        path = nodePath.join(__dirname, "fixtures/test-project/src/hello-world");
        pathInfo = getClientPathInfo(path, {root: nodePath.join(__dirname, "fixtures/test-project")});
        expect(pathInfo).to.deep.equal({
            logicalPath: '/src/hello-world',
            realPath: '/src/hello-world'
        });
    });

    it('should resolve path info correctly for second-level installed modules', function() {
        var path = nodePath.join(__dirname, "fixtures/test-project/node_modules/foo/node_modules/baz/lib/index.js");
        var pathInfo = getClientPathInfo(path, {root: nodePath.join(__dirname, "fixtures/test-project")});
        expect(pathInfo).to.deep.equal({
            logicalPath: '/$/foo/$/baz/lib/index',
            realPath: '/baz@3.0.0/lib/index'
        });
    });

    it('should resolve path info correctly for application modules', function() {
        var path = nodePath.join(__dirname, "fixtures/test-project/src/hello-world/index.js");
        var pathInfo = getClientPathInfo(path, {root: nodePath.join(__dirname, "fixtures/test-project")});
        expect(pathInfo).to.deep.equal({
            logicalPath: '/src/hello-world/index',
            realPath: '/src/hello-world/index'
        });
    });

    it('should handle scoped packages', function() {
        var pathInfo = getClientPathInfo(nodePath.join(__dirname, 'fixtures/test-project/node_modules/@foo/bar/lib/index.js'), {root: nodePath.join(__dirname, "fixtures/test-project")});

        expect(pathInfo).to.deep.equal({
            logicalPath: "/$/@foo/bar/lib/index",
            realPath: "/@foo/bar@3.0.0/lib/index"
        });
    });

    it('should handle modules in a custom search path', function() {
        var pathInfo = getClientPathInfo(nodePath.join(__dirname, 'fixtures/test-project/app_modules/bar/index.js'), {root: nodePath.join(__dirname, "fixtures/test-project")});

        expect(pathInfo).to.deep.equal({
            logicalPath: "/app_modules/bar/index",
            realPath: "/app_modules/bar/index"
        });
    });


});

