requirejs.config({
    baseUrl: "scripts/lib",
    paths: {
        jquery: 'jquery',
        backbone: 'backbone',
        underscore: 'underscore',
        text:'text',
        bootstrap: 'bootstrap',
        userModel: '../models/userModel',
        loggedInUser: '../models/loggedInUser',
        mainView: '../views/mainView',
        loginView: '../views/loginView',
        registrationView: '../views/registrationView',
        editProfileView: '../views/editProfileView',
        app: '../app',
        settings: '../settings',
        router: '../router'

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
        }
    }
});

require([
    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    console.log("main.js require");
    App.initialize();
});
