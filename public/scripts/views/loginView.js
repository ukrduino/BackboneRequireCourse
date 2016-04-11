/**
 *    Login Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'text!../../templates/loginForm.html',
    'bootstrap'], function (_, $, Backbone, settings, LoggedInUser, loginFormTemplate) {

    return Backbone.View.extend({

        id: 'loginForm',
        events: {
            'click #loginButton': 'login'
        },
        loginTemplate: _.template(loginFormTemplate),

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('Login view onClose');
        },

        initialize: function () {

        },

        render: function () {
            console.log("LoginView render and append to contentBlock");
            $('#contentBlock').append(this.$el.html(this.loginTemplate));
            return this;
        },

        login: function () {
            var email = $('#email').val();
            var password = $('#password').val();
            var data = {api_key: settings.get("apiKey"), email: email, password: password};
            if (this.validateEmail(email)) {
                $.post(settings.get("loginUrl"), data, function (responseJson) {
                    responseJson['loggedInUser'] = true;
                    LoggedInUser.setUserData(responseJson).getFriends();
                    Backbone.history.navigate('', {trigger: true});
                }).fail(function (res) {
                    var response = JSON.parse(res.responseText);
                    $('.error').html(response.error);
                });
            } else {
                $('.error').html('Please enter valid e-mail');
            }
        },
        validateEmail: function (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    });
});