define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'loggedInUser',
    'invitationView',
    'headerView',
    'sidePanelView',
    'messagesPanelView',
    'loginView',
    'registrationView',
    'editProfileView',
    'profilePageView'
], function ($, _, Backbone, Settings, LoggedInUser, InvitationView, HeaderView, SidePanelView, MessagePanelView, LoginView,
             RegistrationView, EditProfileView, ProfilePageView) {
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
            var profilePageView = new ProfilePageView();
            profilePageView.render();
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
                new MessagePanelView();
            }
        });
        app_router.on('route:logOut', function () {
            console.log("AppRouter logOut");
            LoggedInUser.clear();
            sessionStorage.clear();
            $.ajax({
                url: Settings.get('logOutUrl'),
                data: {api_key:Settings.get('apiKey')},
                type: 'DELETE',
                success: function (result) {
                    console.log(result);
                    Backbone.history.navigate('',{trigger: true});
                }
            });
        });
        console.log("AppRouter initialize");
        if (typeof(Storage) !== "undefined") {
            var loggedInUserData = sessionStorage.getItem("loggedInUser");
            if (!_.isUndefined(loggedInUserData)) {
                LoggedInUser.setUserData(JSON.parse(loggedInUserData));
            }
        } else {
            console.log('Sorry! No Web Storage support..');
        }
        Backbone.trigger('build_header');
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
