/**
 *    Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'loggedInUser',
    'text!../../templates/profilePage.html',
    'bootstrap'], function (_, $, Backbone, LoggedInUser, profilePageTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(profilePageTemplate),
        initialize: function () {

        },

        render: function () {
            console.log("profilePageView render");
            this.$el.html(this.template(LoggedInUser.toJSON()));
            return this;
        }
    });
});
