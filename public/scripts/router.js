define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'eventDispatcher',
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
], function ($, _, Backbone, Settings, eventDispatcher, LoggedInUser, InvitationView, HeaderView, SidePanelView, MessagePanelView, LoginView,
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
        },
        userIsLoggedIn: function () {
            return !_.isNull(LoggedInUser.get('id')) && !_.isUndefined(LoggedInUser.get('id'))
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        app_router.on('route:showLoginForm', function () {
            var loginView = new LoginView();
            loginView.render();
        });
        app_router.on('route:showRegistrationForm', function () {
            var registrationView = new RegistrationView();
            registrationView.render();
        });
        app_router.on('route:showProfilePage', function () {
            if (this.userIsLoggedIn()) {
                var profilePageView = new ProfilePageView();
                var userDataJson = LoggedInUser.toJSON();
                userDataJson['loggedInUser'] = true;
                profilePageView.preRender(userDataJson);
            }
        });
        app_router.on('route:showEditProfileForm', function () {
            if (this.userIsLoggedIn()) {
                var editProfileView = new EditProfileView();
                editProfileView.render();
            }
        });
        app_router.on('route:showFriendsPage', function () {
            if (this.userIsLoggedIn()) {
                $('#contentBlock').empty().append(_.template(friendsPageBaseTemplate));
                new MyFriendsPanelView();
                new SearchUsersPanelView();
            }
        });
        app_router.on('route:showHomePage', function () {
            if (!this.userIsLoggedIn()) {
                eventDispatcher.trigger('InvitationView:render');
            } else {
                $('#contentBlock').empty().append(_.template(homePageBaseTemplate));
                new SidePanelView();
                new MessagePanelView();
            }
        });
        app_router.on('route:logOut', function () {
            if (this.userIsLoggedIn()) {
                LoggedInUser.clear();
                sessionStorage.clear();
                $.ajax({
                    url: Settings.get('logOutUrl'),
                    data: {api_key: Settings.get('apiKey')},
                    type: 'DELETE',
                    success: function (result) {
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
            }
        });
        app_router.listenTo(eventDispatcher, 'router:showUserProfilePage', function (userDataJson) {
            if (this.userIsLoggedIn()) {
                var profilePageView = new ProfilePageView();
                profilePageView.preRender(userDataJson);
            }
        });

        if (typeof(Storage) !== "undefined") {
            var loggedInUserData = sessionStorage.getItem("loggedInUser");
            if (!_.isUndefined(loggedInUserData)) {
                LoggedInUser.setUserData(JSON.parse(loggedInUserData));
            }
        } else {
            console.log('Sorry! No Web Storage support..');
        }
        eventDispatcher.trigger('HeaderView:render');
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
