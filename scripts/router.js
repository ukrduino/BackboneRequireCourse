define([
    'jquery',
    'underscore',
    'backbone',
    'loggedInUser',
    'invitationView',
    'headerView',
    'sidePanelView',
    'mainPanelView',
    'loginView',
    'registrationView',
    'editProfileView'
], function ($, _, Backbone, LoggedInUser, InvitationView, HeaderView, SidePanelView, MainPanelView, LoginView, RegistrationView, EditProfileView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showHomePage',
            'login': 'showLoginForm',
            'logout': 'logOut',
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
            if(!LoggedInUser.get('id')){
                Backbone.trigger('show_invitationPanel');
                console.log("AppRouter showHomePage, show_invitationPanel");
            }else {

                var sidePanelView = new SidePanelView();
                sidePanelView.render();
                var mainPanelView = new MainPanelView();
                mainPanelView.render();
            }

        });
        app_router.on('route:logOut', function () {
            console.log("AppRouter logOut");
            LoggedInUser.clear();
            // TODO app_router.trigger('showHomePage') - not working - why?
            app_router.navigate('', {trigger:true}); // Go Home
            // TODO ajax not works due to Access-Control-Allow-Origin
            //$.ajax({
            //    url: Settings.get('logOutUrl'),
            //    data: {api_key:Settings.get('apiKey')},
            //    type: 'DELETE',
            //    success: function (result) {
            //        console.log(result);
            //    }
            //});
        });
        console.log("AppRouter initialize");
        Backbone.trigger('build_header');
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
