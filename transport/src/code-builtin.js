function registerBuiltinCode(name, target, options) {
    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$rmod';

    var code = modulesRuntimeGlobal + '.builtin(' +
        JSON.stringify(name) + ', ' +
        JSON.stringify(target) +
        ');';

    return code;
}

module.exports = registerBuiltinCode;