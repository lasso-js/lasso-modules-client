function readyCode(options) {
    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$_mod';
    return 'if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", ' + modulesRuntimeGlobal + '.ready' + '); } else { ' + modulesRuntimeGlobal + '.ready(); }';
}

module.exports = readyCode;