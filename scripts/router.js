define([
    'jquery',
    'underscore',
    'backbone',
    'mainView',
    'loginView',
    'registrationView'
], function ($, _, Backbone, MainView, LoginView, RegistrationView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'showLoginForm',
            'register': 'showRegistrationForm'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        app_router.on('route:showLoginForm', function(){
            console.log("AppRouter showLoginForm");

            var loginView = new LoginView();
            loginView.render();
        });
        app_router.on('route:showRegistrationForm', function(){
            var registrationView = new RegistrationView();
            registrationView.render();
        });
        console.log("AppRouter initialize");
        var mainView = new MainView();
        mainView.render();
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
