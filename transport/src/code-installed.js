function installedCode(logicalParentPath, childName, childVersion, options) {
    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$rmod';

    if (logicalParentPath === '/') {
        logicalParentPath = '';
    }

    var code = modulesRuntimeGlobal + '.installed(' + JSON.stringify(logicalParentPath) + ', ' +
        JSON.stringify(childName) + ', ' +
        JSON.stringify(childVersion);

    code += ');';
    return code;
}

module.exports = installedCode;