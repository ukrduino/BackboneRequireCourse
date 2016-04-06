/**
 *    Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'eventDispatcher',
    'loggedInUser',
    'text!../../templates/profilePage.html',
    'bootstrap'], function (_, $, Backbone, eventDispatcher, LoggedInUser, profilePageTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(profilePageTemplate),
        events:{
            "click #removeFriend": 'removeFriend',
            "click #addFriend": 'addFriend'
        },
        initialize: function () {

        },

        render: function (userDataJson) {
            console.log("profilePageView render");
            this.$el.html(this.template(userDataJson));
            return this;
        },

        removeFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
             eventDispatcher.trigger('myFiendsPanelView:makeRemoveFriendRequest', user_id);
        },
        addFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
             eventDispatcher.trigger('searchUsersPanelView:makeAddFriendRequest', user_id);
        }
    });
});
