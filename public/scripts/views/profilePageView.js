/**
 *    Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'text!../../templates/profilePage.html',
    'bootstrap'], function (_, $, Backbone, settings, eventDispatcher, LoggedInUser, profilePageTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(profilePageTemplate),
        events: {
            "click #removeFriend": 'removeFriend',
            "click #addFriend": 'addFriend'
        },
        userDataJson: null,
        initialize: function () {

        },
        preRender: function (userDataJson) {
            this.userDataJson = userDataJson;
            this.getNumberOfMessagesOnUsersWall(userDataJson.id);
        },

        render: function () {
            this.$el.html(this.template(this.userDataJson));
            return this;
        },
        removeFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
            eventDispatcher.trigger('myFiendsPanelView:makeRemoveFriendRequest', user_id);
        },
        addFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
            eventDispatcher.trigger('searchUsersPanelView:makeAddFriendRequest', user_id);
        },
        getNumberOfMessagesOnUsersWall: function (id) {
            var that = this;
            var data = {
                api_key: settings.get('apiKey'),
                receiver_id: id
            };
            $.ajax({
                url: settings.get('searchWallPosts'),
                type: 'GET',
                data: data,
                success: function (result) {
                    var messagesNumber = Object.keys(result).length;
                    if (messagesNumber > 0) {
                        that.userDataJson['messages'] = messagesNumber;
                    }else{
                        that.userDataJson['messages'] = 0;
                    }
                    console.log(that.userDataJson);
                    that.render();
                },
                error: function (result) {
                    console.log("error: ", result.responseText);
                }
            });
        }
    });
});
