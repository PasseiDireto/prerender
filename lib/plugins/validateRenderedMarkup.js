module.exports = {
    afterPhantomRequest: function(req, res, next) {
        function isMarkupValid(markup) {
            return Buffer.byteLength(markup, 'utf8') > 20000;
        }

        if (req.prerender.statusCode === 200 && !isMarkupValid(req.prerender.documentHTML)) {
            console.log('invalid markup for', req.prerender.url);
            res.send(504);
            return;
        }
        else {
            next();
        }
    }
};
