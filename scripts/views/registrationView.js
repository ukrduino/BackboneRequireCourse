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
        },

        register: function () {
            console.log("RegisterView register ");
            var email = $('#email').val();
            var password = $('#password').val();
            var passwordConfirmation = $('#passwordConfirmation').val();
            if (password == passwordConfirmation) {
                var data = {api_key: settings.get("apiKey"), email: email, password: password};
                $.post(settings.get("signUpUrl"), data, function () {
                    $.post(settings.get("loginUrl"), data, function(responseJson){
                        loggedInUser.setUserData(responseJson)
                    });
                }).fail(function (data) {
                    console.log("error: ", data.responseText);
                });
            } else {
                this.render();
            }
        }
    })
});