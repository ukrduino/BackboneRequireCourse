/**
 *    Login Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/loginForm.html',
    'bootstrap'], function (_, $, Backbone, loginFormTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),

        initialize: function () {
            console.log("LoginView initialize");

        },

        render: function () {
            console.log("LoginView render");
            this.$el.html(_.template(loginFormTemplate));
        }
    });
});