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

        initialize: function (user) {
            this.user = user;
            if (LoggedInUser.checkUserIsFriend(this.user.get('id'))) {
                this.user.set('isFriend', true)
            }
            this.user.getNumberOfMessages();
            this.listenTo(eventDispatcher, 'UserModel:successGetNumberOfMessages',
                function () {
                    this.render();
                });
            this.render();
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('profilePage view onClose');
            this.stopListening();
        },

        render: function () {
            console.log("profilePage panel render");
            $('#contentBlock').append(this.$el.html(this.template(this.user.toJSON())));
        },

        removeFriend: function () {
            LoggedInUser.removeFromFriend(this.user.get('id'));
        },
        addFriend: function () {
            LoggedInUser.addToFriends(this.user.get('id'));
        }
    });
})
;
