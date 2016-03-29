function runCode(path, runOptions, options) {
    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$rmod';
    return modulesRuntimeGlobal + '.run(' + JSON.stringify(path) +
        (runOptions ? (',' + JSON.stringify(runOptions)) : '') + ');';
}

module.exports = runCode;