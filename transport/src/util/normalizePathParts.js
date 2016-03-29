function normalizePathParts(path) {
    var parts = path.split(/[\\/]/);
    for (var i=0, len=parts.length; i<len; i++) {
        var part = parts[i];

        if (part === 'node_modules') {
            parts[i] = '$';
        } else {
            // Replacing "$" characters with a "!" is kind of a hack
            // but it works well enough. We just can't allow "$" in the
            // logical or real path since "$" has a special meaning
            // as a "node_modules" directory. This fixes the following
            // issue:
            // Fixes https://github.com/lasso-js/lasso-require/issues/13
            parts[i] = part.replace(/[$]/g, '!');
        }
    }

    return parts.join('/');
}

module.exports = normalizePathParts;