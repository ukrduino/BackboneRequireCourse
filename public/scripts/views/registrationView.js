/**
 *    Registration Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'text!../../templates/registrationForm.html',
    'bootstrap'], function (_, $, Backbone, settings, loggedInUser, registrationFormTemplate) {

    return Backbone.View.extend({
        id: 'registrationForm',
        events: {
            'click #registerButton': 'register'
        },
        registrationTemplate: _.template(registrationFormTemplate),

        initialize: function () {
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
        },

        render: function () {
            $('#contentBlock').append(this.$el.html(this.registrationTemplate));
        },

        register: function () {
            var email = $('#email').val();
            var password = $('#password').val();
            var passwordConfirmation = $('#passwordConfirmation').val();
            if (password == passwordConfirmation && this.validateEmail(email)) {
                var data = {api_key: settings.get("apiKey"), email: email, password: password};
                $.post(settings.get("signUpUrl"), data, function () {
                    $.post(settings.get("loginUrl"), data, function (responseJson) {
                        loggedInUser.setUserData(responseJson)
                    });
                }).fail(function (data) {
                    console.log("error: ", data.responseText);
                });
            } else {
                $('.error').html('Please enter valid e-mail and/or confirm password');
            }
        },
        validateEmail: function (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    })
});