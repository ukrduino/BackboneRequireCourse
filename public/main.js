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
        mainPageView: '../views/mainPageView',
        messagesPanelView: '../views/messagesPanelView',
        messageView: '../views/messageView',
        tweetsPageView: '../views/tweetsPageView',
        tweetsPanelView: '../views/tweetsPanelView',
        sidePanelView: '../views/sidePanelView',
        loginView: '../views/loginView',
        registrationView: '../views/registrationView',
        profilePageView: '../views/profilePageView',
        editProfileView: '../views/editProfileView',
        userSearchPageView: '../views/userSearchPageView',
        myFriendsPanelView: '../views/myFriendsPanelView',
        searchUserPanelView: '../views/searchUserPanelView',
        userCardView: '../views/userCardView',
        app: '../app',
        settings: '../settings',
        router: '../router',
        eventDispatcher: '../eventDispatcher',
        paginatedCollection: 'backbone-paginated-collection'
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
    'backbone','app'
], function(Backbone, App){
    // The "app" dependency is passed in as "App"
    App.initialize();
    //Custom close() method to clear(correct) view closing
    Backbone.View.prototype.close = function(){
        //removes DOM element when view is closed
        this.remove();
        //unbinds all view events (e.g. "click #someButton": "doThat",)
        this.unbind();
        console.log('Close from Backbone.View.prototype');
        //fires onClose() of view to unbind models collections events in closing view. DO IT IN VIEW!!!
        if (this.onClose){
            this.onClose();
        }
    }
});
