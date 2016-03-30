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
            if (this.validateEmail(email)) {
                $.post(settings.get("loginUrl"), data, function (responseJson) {
                    loggedInUser.setUserData(responseJson)
                });
            }else {
                $('.error').html('Please enter valid e-mail');
            }
        },
        validateEmail: function (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    });
});