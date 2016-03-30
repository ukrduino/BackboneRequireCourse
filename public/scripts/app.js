define(['router'], function (Router) {
    var initialize = function () {
        console.log("app.js initialize");
        Router.initialize();
    };
    return {
        initialize: initialize
    };
});
