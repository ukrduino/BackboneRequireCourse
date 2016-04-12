/**
 *    My Friends Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'userCardView',
    'text!../../templates/myFriendsPanel.html',
    'bootstrap'], function (_,
                            $,
                            Backbone,
                            settings,
                            eventDispatcher,
                            LoggedInUser,
                            UserCardView,
                            myFriendsPanelTemplate) {

    return Backbone.View.extend({
        id: 'friendsPanel',
        template: _.template(myFriendsPanelTemplate),
        events: {
            "click .removeFriend": 'removeFriend',
            "click .viewProfile": 'viewProfile',
            "click #friendsFilterToggle": 'friendsFilterToggle',
            "keyup .friendsFilter" : "search"
        },
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('friendsPanel view onClose');
            this.stopListening();
        },
        initialize: function () {
            this.render();
            this.showFriends();
            this.listenTo(eventDispatcher, 'LoggedInUser:friendsCollectionUpdated', function () {
                this.showFriends();
            });
        },
        render: function () {
            $('#contentBlock').append(this.$el.html(this.template));
            $('.friendsFilter').hide();
        },

        showFriends: function () {
            $('#friends').empty();
            LoggedInUser.collection.each(function (userModel) {
                    userModel.set('isFriend', true).set('showDeleteButton', true);
                    var userCardView = new UserCardView({model: userModel});
                    $('#friends').append(userCardView.render().el);
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        },

        removeFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
            LoggedInUser.removeFromFriend(user_id);
        },

        viewProfile: function (event) {
            var user_id = $(event.currentTarget).data('id');
            Backbone.history.navigate('#profile/' + user_id, {trigger: true});
        },
        friendsFilterToggle: function () {
            $('.friendsFilter').toggle();
        },
        search: function (event) {
            var currentInputField = $(event.currentTarget);
            $('.friendsFilter').not(currentInputField).val('');
            var field = currentInputField.data('field');
            var letters = currentInputField.val();
            this.showFilteredFriends(LoggedInUser.collection.search(letters, field));
        },
        showFilteredFriends: function (filteredFriendsCollection) {
            $('#friends').empty();
            filteredFriendsCollection.each(function (userModel) {
                    userModel.set('isFriend', true).set('showDeleteButton', true);
                    var userCardView = new UserCardView({model: userModel});
                    $('#friends').append(userCardView.render().el);
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
});

