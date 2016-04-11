define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'eventDispatcher',
    'userModel',
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
                                     UserModel,
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
            'profile/(:id)': 'showProfilePage',
            'edit/profile': 'showEditProfileForm',
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
        app_router.on('route:showProfilePage', function (id) {
            if (this.userIsLoggedIn()) {
                if (id) {
                    console.log('id:',id);
                    var user = new UserModel();
                    user.getUserById(id)
                } else {
                    this.showView(new ProfilePageView(LoggedInUser));
                }
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
        app_router.listenTo(eventDispatcher, 'UserModel:successGetUserById', function (user) {
            this.showView(new ProfilePageView(user));
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
