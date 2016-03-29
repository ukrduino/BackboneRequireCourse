/**
 *    Login Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'text!../../templates/loginForm.html',
    'bootstrap'], function (_, $, Backbone, settings, loggedInUser, loginFormTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        events: {
            'click #loginButton': 'login'
        },
        model:loggedInUser,

        initialize: function () {
            console.log("LoginView initialize");
        },

        render: function () {
            console.log("LoginView render");
            this.$el.html(_.template(loginFormTemplate));
        },

        login: function () {
            console.log("LoginView login Settings.apiKey: " + settings.get("apiKey"));
            var email = $('#email').val();
            var password = $('#password').val();
            var data = {api_key: settings.get("apiKey"), email: email, password: password};
            $.post(settings.get("loginUrl"), data, this.loggedIn)
                .done(function (collection, response, options) {
                })
                //TODO how to get error response from server
                .fail(function (response) {
                    console.log("error: ", response);
                })
                .always(function () {
                });
        },
        loggedIn: function (responseJson) {
            console.log("LoginView loggedIn as: " + loggedInUser.get('first_name'));
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("loggedInUser", JSON.stringify(responseJson));
            } else {
                console.log('Sorry! No Web Storage support..');
            }
            loggedInUser.set(responseJson);
        }
    });
})
;