/**
 *    Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'userModel',
    'loggedInUser',
    'text!../../templates/profilePage.html',
    'bootstrap'], function (_, $, Backbone, settings, eventDispatcher, UserModel, LoggedInUser, profilePageTemplate) {

    return Backbone.View.extend({
        id: 'profilePage',
        template: _.template(profilePageTemplate),
        events: {
            "click #removeFriend": 'removeFriend',
            "click #addFriend": 'addFriend'
        },

        initialize: function (id) {
            if (id == LoggedInUser.get('id')) {
                this.user = LoggedInUser;
                this.user.getNumberOfMessages();
            } else {
                this.user = new UserModel();
                this.user.getUserById(id);
            }
            this.listenTo(eventDispatcher, 'UserModel:successGetUserById', function (user) {
                if (LoggedInUser.checkUserIsFriend(user.get('id'))) {
                    user.set('isFriend', true)
                }
                user.getNumberOfMessages();
            });
            this.listenTo(eventDispatcher, 'UserModel:successGetNumberOfMessages', this.render);
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            this.stopListening();
        },

        render: function () {
            $('#contentBlock').append(this.$el.html(this.template(this.user.toJSON())));
        },

        removeFriend: function () {
            LoggedInUser.removeFromFriend(this.user.get('id'));
        },
        addFriend: function () {
            LoggedInUser.addToFriends(this.user.get('id'));
        }
    });
});
