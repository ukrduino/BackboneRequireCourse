/**
 *    Edit Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'loggedInUser',
    'text!../../templates/editProfileForm.html',
    'bootstrap'], function (_, $, Backbone, LoggedInUser, editProfileFormTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(editProfileFormTemplate),
        initialize: function () {
        },

        render: function () {
            console.log("editProfileView render");
            this.$el.html(this.template(LoggedInUser.toJSON()));
        }
    });
});
