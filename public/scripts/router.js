define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'invitationView',
    'headerView',
    'mainPageView',
    'loginView',
    'registrationView',
    'editProfileView',
    'profilePageView',
    'userSearchPageView'], function ($,
                                     _,
                                     Backbone,
                                     Settings,
                                     eventDispatcher,
                                     LoggedInUser,
                                     InvitationView,
                                     HeaderView,
                                     MainPageView,
                                     LoginView,
                                     RegistrationView,
                                     EditProfileView,
                                     ProfilePageView,
                                     UserSearchPageView) {
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
            console.log('LoggedInUser:', LoggedInUser);
            return !_.isNull(LoggedInUser.get('id')) && !_.isUndefined(LoggedInUser.get('id'))
        },
        showView: function (view) {
            console.log('CurrentView:', this.currentView);
            if (!_.isUndefined(this.currentView)) {
                this.currentView.close();
            }
            this.currentView = view;
            return view;
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        app_router.on('route:showLoginForm', function () {
            this.showView(new LoginView()).render();
        });
        app_router.on('route:showRegistrationForm', function () {
            this.showView(new RegistrationView()).render();
        });
        app_router.on('route:showProfilePage', function () {
            if (this.userIsLoggedIn()) {
                var userDataJson = LoggedInUser.toJSON();
                userDataJson['loggedInUser'] = true;
                this.showView(new ProfilePageView()).preRender(userDataJson);
            }
        });
        app_router.on('route:showEditProfileForm', function () {
            if (this.userIsLoggedIn()) {
                this.showView(new EditProfileView()).render();
            }
        });
        app_router.on('route:showFriendsPage', function () {
            if (this.userIsLoggedIn()) {
                this.showView(new UserSearchPageView()).render();
            }
        });
        app_router.on('route:showHomePage', function () {
            if (!this.userIsLoggedIn()) {
                this.showView(new InvitationView()).render();
            } else {
                this.showView(new MainPageView()).render();
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
                        Backbone.history.navigate('login', {trigger: true});
                    }
                });
            }
        });
        app_router.listenTo(eventDispatcher, 'router:showUserProfilePage', function (userDataJson) {
            if (this.userIsLoggedIn()) {
                this.showView(new ProfilePageView()).preRender(userDataJson);
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
