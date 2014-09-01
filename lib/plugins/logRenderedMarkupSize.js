module.exports = {
    afterPhantomRequest: function(req, res, next) {
        var size = Buffer.byteLength(req.prerender.documentHTML, 'utf8');
        console.log('rendered', size, 'bytes for', req.prerender.url);
        next();
    }
};
