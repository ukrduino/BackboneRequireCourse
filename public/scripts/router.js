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
    'profilePageView',
    'myFriendsPanelView',
    'searchUserPanelView',
    'text!../../templates/homePageBaseTemplate.html',
    'text!../../templates/friendsPageBaseTemplate.html'
], function ($, _, Backbone, Settings, LoggedInUser, InvitationView, HeaderView, SidePanelView, MessagePanelView, LoginView,
             RegistrationView, EditProfileView, ProfilePageView, MyFriendsPanelView, SearchUsersPanelView, homePageBaseTemplate,friendsPageBaseTemplate) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showHomePage',
            'login': 'showLoginForm',
            'logout': 'logOut',
            'register': 'showRegistrationForm',
            'profile': 'showProfilePage',
            'profile/edit': 'showEditProfileForm',
            'friends': 'showFriendsPage'
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
            if (!_.isNull(LoggedInUser.get('id'))) {
                console.log("AppRouter showProfilePage");
                var profilePageView = new ProfilePageView();
                profilePageView.render();
            }
        });
        app_router.on('route:showEditProfileForm', function () {
            if (!_.isNull(LoggedInUser.get('id'))) {
                console.log("AppRouter showEditProfileForm");
                var editProfileView = new EditProfileView();
                editProfileView.render();
                console.log(LoggedInUser.get('id'));
            }
        });
        app_router.on('route:showFriendsPage', function () {
            if (!_.isNull(LoggedInUser.get('id'))) {
                console.log("AppRouter showFriendsPage");
                $('#contentBlock').empty().append(_.template(friendsPageBaseTemplate));
                new MyFriendsPanelView();
                new SearchUsersPanelView();
            }
        });
        app_router.on('route:showHomePage', function () {
            if (_.isNull(LoggedInUser.get('id'))) {
                Backbone.trigger('show_invitationPanel');
                console.log("AppRouter showHomePage, show_invitationPanel");
            } else {
                console.log("AppRouter showHomePage, showHomePage");
                $('#contentBlock').empty().append(_.template(homePageBaseTemplate));
                new SidePanelView();
                new MessagePanelView();
            }
        });
        app_router.on('route:logOut', function () {
            if (!_.isNull(LoggedInUser.get('id'))) {
                console.log("AppRouter logOut");
                LoggedInUser.clear();
                sessionStorage.clear();
                $.ajax({
                    url: Settings.get('logOutUrl'),
                    data: {api_key: Settings.get('apiKey')},
                    type: 'DELETE',
                    success: function (result) {
                        console.log(result);
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
            }
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
