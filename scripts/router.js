define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'mainView',
    'loginView',
    'registrationView',
    'editProfileView'
], function ($, _, Backbone, Settings, MainView, LoginView, RegistrationView, EditProfileView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showHomePage',
            'login': 'showLoginForm',
            'register': 'showRegistrationForm',
            'profile': 'showProfilePage',
            'profile/edit': 'showEditProfileForm'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        app_router.on('route:showLoginForm', function () {
            console.log("AppRouter showLoginForm");
            var loginView = new LoginView();
            loginView.render();
        });
        app_router.on('route:showRegistrationForm', function () {
            console.log("AppRouter showRegistrationForm");
            var registrationView = new RegistrationView();
            registrationView.render();
        });
        app_router.on('route:showProfilePage', function () {
            console.log("AppRouter showProfilePage");
            var registrationView = new RegistrationView();
            registrationView.render();
        });
        app_router.on('route:showEditProfileForm', function () {
            console.log("AppRouter showEditProfileForm");
            var editProfileView = new EditProfileView();
            editProfileView.render();
        });
        app_router.on('route:showHomePage', function () {
            console.log("AppRouter showHomePage");
            var mainView = new MainView();
            mainView.render();
        });
        console.log("AppRouter initialize");
        app_router.trigger('showHomePage');
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
