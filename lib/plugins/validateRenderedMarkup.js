var util = require('../util.js');

module.exports = {
    afterPhantomRequest: function(req, res, next) {
        function isMarkupValid(markup) {
            return Buffer.byteLength(markup, 'utf8') > 20000;
        }

        var statusCode = req.prerender.statusCode;

        if ((!statusCode || statusCode === 200) && !isMarkupValid(req.prerender.documentHTML)) {
            util.log('invalid markup for', req.prerender.url);
            res.send(504);
            return;
        }
        else {
            next();
        }
    }
};
