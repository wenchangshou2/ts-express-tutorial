'use struct';
"use strict";
var Route;
(function (Route) {
    class Index {
        index(req, res, next) {
            console.log('index');
            res.render('index');
        }
    }
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
