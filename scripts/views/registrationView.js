/**
 *    Registration Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/registrationForm.html',
    'bootstrap'], function (_, $, Backbone, registrationFormTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        initialize: function () {

        },

        render: function () {
            console.log("registrationView render");
            this.$el.html(_.template(registrationFormTemplate));
        }
    });
});