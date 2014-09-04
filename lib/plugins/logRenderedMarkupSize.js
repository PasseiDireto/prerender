var util = require('../util.js');

module.exports = {
    afterPhantomRequest: function(req, res, next) {
        var size = Buffer.byteLength(req.prerender.documentHTML, 'utf8');
        util.log('rendered', size, 'bytes for', req.prerender.url);
        next();
    }
};
