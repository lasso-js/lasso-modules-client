function readyCode(options) {
    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$rmod';
    return modulesRuntimeGlobal + '.ready();';
}

module.exports = readyCode;