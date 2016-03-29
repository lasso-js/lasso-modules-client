var path = require('path');
var normalizePathParts = require('./util/normalizePathParts');
var removeCommonExt = require('./util/removeCommonExt');

function normalizeMain(dir, main) {
    var relativePath = normalizePathParts(path.relative(dir, main));
    relativePath = removeCommonExt(relativePath);

    if (relativePath === 'index') {
        return '';
    }

    return relativePath;
}

module.exports = normalizeMain;
