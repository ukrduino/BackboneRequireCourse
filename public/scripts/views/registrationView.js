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
        el: $('#contentBlock'),
        events: {
            'click #registerButton': 'register'
        },

        initialize: function () {
            console.log("RegisterView initialize");
        },

        render: function () {
            console.log("registrationView render");
            this.$el.html(_.template(registrationFormTemplate));
            return this;
        },

        register: function () {
            console.log("RegisterView register ");
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