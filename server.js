#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    port: parseInt(process.argv[2]) || 3000,
    phantomBasePort: parseInt(process.argv[3]) || 12300,
    workers: 1,
    iterations: 10,

    // Timeouts (milliseconds)
    pageDoneCheckTimeout: 1000,
    resourceDownloadTimeout: 30000,
    waitAfterLastRequest: 5000,
    jsTimeout: 20000,
    jsCheckTimeout: 1000,
    evaluateJavascriptCheckTimeout: 1000,

    // This callback runs under the context of PhantomJS, so it cannot access neither global variables nor closures
    // from this script
    onResourceRequested: function(requestData, request) {
        if (!/https?:\/\/(.*\.)?passeidireto\.com\/?.*/.test(requestData.url) ||
            /.(css|jpg|gif|png)/.test(requestData.url)) {
            request.abort();
        }
    }
});

server.use(prerender.removeScriptTags());
// server.use(prerender.logger());
// server.use(prerender.s3HtmlCache());

server.start();