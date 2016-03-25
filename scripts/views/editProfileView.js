/**
 *    Edit Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/editProfileForm.html',
    'bootstrap'], function (_, $, Backbone, editProfileFormTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        initialize: function () {
        },

        render: function () {
            console.log("editProfileView render");
            this.$el.html(_.template(editProfileFormTemplate));
        }
    });
});
