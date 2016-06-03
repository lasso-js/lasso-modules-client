module.exports = function(packageName, bundle, lassoContext, options) {
    var url;
    if (!bundle.hasContent() || !(url = bundle.getUrl(lassoContext))) {
        return null;
    }

    var contentType;

    if (bundle.isJavaScript()) {
        contentType = 'js';
    } else if (bundle.isStyleSheet()) {
        contentType = 'css';
    } else {
        throw new Error('Invalid bundle content type: ' + bundle.getContentType());
    }

    var modulesRuntimeGlobal = (options && options.modulesRuntimeGlobal) || '$_mod';
    return modulesRuntimeGlobal + '.async(' +
        JSON.stringify(packageName) + ',' +
        JSON.stringify(contentType) + ',' +
        JSON.stringify(url) +
        ');';
};