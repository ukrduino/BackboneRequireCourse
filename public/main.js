requirejs.config({
    baseUrl: "scripts/lib",
    paths: {
        jquery: 'jquery',
        backbone: 'backbone',
        underscore: 'underscore',
        text:'text',
        bootstrap: 'bootstrap',
        moment: 'moment-with-locales',
        datepicker: 'bootstrap-datepicker',
        userModel: '../models/userModel',
        loggedInUser: '../models/loggedInUser',
        messageModel: '../models/messageModel',
        messagesCollection: '../collections/messagesCollection',
        friendsCollection: '../collections/friendsCollection',
        usersCollection: '../collections/usersCollection',
        headerView: '../views/headerView',
        invitationView: '../views/invitationView',
        messagesPanelView: '../views/messagesPanelView',
        messageView: '../views/messageView',
        sidePanelView: '../views/sidePanelView',
        loginView: '../views/loginView',
        registrationView: '../views/registrationView',
        profilePageView: '../views/profilePageView',
        editProfileView: '../views/editProfileView',
        myFriendsPanelView: '../views/myFriendsPanelView',
        searchUserPanelView: '../views/searchUserPanelView',
        userCardView: '../views/userCardView',
        app: '../app',
        settings: '../settings',
        router: '../router',
        eventDispatcher: '../eventDispatcher'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "bootstrap" : {
            "deps" :['jquery']
        },
        "datepicker" : {
            deps: ["jquery"]
        }
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});

require([
    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});
