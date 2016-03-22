define([
    'jquery',
    'underscore',
    'backbone',
    'mainView'
], function ($, _, Backbone, MainView) {
    var AppRouter = Backbone.Router.extend({
        //set up routs here
    });

    var initialize = function () {
        //var app_router = new AppRouter;
        console.log("AppRouter initialize");
        var mainView = new MainView();
        mainView.render();
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
