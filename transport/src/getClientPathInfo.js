require('raptor-polyfill/string/startsWith');
require('raptor-polyfill/string/endsWith');

var nodePath = require('path');
var ok = require('assert').ok;
var lassoPackageRoot = require('lasso-package-root');
var removeCommonExt = require('./util/removeCommonExt');
var normalizePathParts = require('./util/normalizePathParts');

var sep = nodePath.sep;

function getClientPathInfo(path, options) {
    ok(typeof path === 'string', 'path should be a string');
    options = options || {};
    var normalizedPath = nodePath.normalize(path);

    var removeExt = options.removeExt !== false;
    var root = options.root || lassoPackageRoot.getRootDir(path);

    var lastNodeModules = normalizedPath.lastIndexOf('node_modules' + sep);
    var logicalPath;
    var realPath;

    var name;
    var version;
    var basePath;

    if (!options.makeRoot && root && normalizedPath.startsWith(nodePath.normalize(root))) {
        logicalPath = normalizePathParts(path.substring(root.length));
        if (logicalPath === '') {
            logicalPath = '/';
        }

        if (lastNodeModules !== -1) {
            var nodeModulesDir = path.substring(0, lastNodeModules + ('node_modules' + sep).length);
            var pkg = lassoPackageRoot.getRootPackage(path);
            if (!pkg) {
                throw new Error('Unable to find the root package.json for the following path: ' + path);
            }
            name = pkg.name;
            version = pkg.version;

            var moduleNameEnd = nodeModulesDir.length + name.length;
            basePath = '/' + name + '@' + version;
            realPath = normalizePathParts(basePath + path.substring(moduleNameEnd));
        } else {
            realPath = logicalPath;
        }
    } else {
        // The module must be linked in so treat it as a top-level installed
        // dependency since we have no way of knowing which dependency this module belongs to
        // based on the given path
        var moduleRootPkg = lassoPackageRoot.getRootPackage(path);
        if (!moduleRootPkg) {
            throw new Error('Unable to find the root package.json for the following path: ' + path);
        }
        name = moduleRootPkg.name;
        version = moduleRootPkg.version;


        basePath = '/' + name + '@' + version;
        realPath = normalizePathParts(basePath + path.substring(moduleRootPkg.__dirname.length));
        logicalPath = '/$/' +name + path.substring(moduleRootPkg.__dirname.length);
        // console.log('RESOLVE LINKED MODULE: ', '\npath: ', path, '\nrealPath: ', realPath, '\nlogicalPath: ', logicalPath, '\ndep: ', dep, '\nmoduleRootPkg.__dirname: ', moduleRootPkg.__dirname);
    }

    if (sep !== '/') {
        realPath = realPath.replace(/[\\]/g, '/');
        logicalPath = logicalPath.replace(/[\\]/g, '/');
    }

    if (realPath.endsWith('/')) {
        realPath = realPath.slice(0, -1);
    }

    if (logicalPath.endsWith('/')) {
        logicalPath = logicalPath.slice(0, -1);
    }

    if (removeExt) {
        logicalPath = removeCommonExt(logicalPath);
        realPath = removeCommonExt(realPath);
    }

    return {
        logicalPath: logicalPath || '/',
        realPath: realPath || '/',
    };
}

module.exports = getClientPathInfo;
