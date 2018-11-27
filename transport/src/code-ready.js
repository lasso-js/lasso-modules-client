function readyCode(options) {
    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$_mod';
    return 'if (document.readyState !== "loading") { ' + modulesRuntimeGlobal + '.ready();' + ' } else { document.addEventListener("DOMContentLoaded", ' + modulesRuntimeGlobal + '.ready' + '); }';
}

module.exports = readyCode;