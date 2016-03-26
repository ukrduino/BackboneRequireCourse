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
            var jqxhr = $.post(settings.get("loginUrl"), data, this.loggedIn)
                .done(function (collection, response, options) {
                })
                .fail(function (data) {
                    console.log("error: ", data.responseText);
                })
                .always(function () {
                });
        },
        loggedIn: function (jqxhr) {
            loggedInUser.set(data);
            trigger('showHomePage'); // Go Home
            console.log("LoginView login response: " + loggedInUser.get('first_name'));

        }
    });
})
;