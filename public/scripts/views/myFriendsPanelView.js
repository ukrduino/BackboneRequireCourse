/**
 *    My Friends Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'friendsCollection',
    'userCardView',
    'text!../../templates/myFriendsPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, eventDispatcher, LoggedInUser, FriendsCollection, UserCardView, myFriendsPanelTemplate) {

    return Backbone.View.extend({
        el: '#friendsPanel',
        template: _.template(myFriendsPanelTemplate),
        collection: new FriendsCollection(),
        events: {
            "click .removeFriend": 'removeFriend',
            "click .viewProfile": 'viewProfile'
        },
        initialize: function () {
            this.render();
            this.fetchCollection();
            this.listenTo(eventDispatcher, 'myFriendsPanelView:fetchCollection', function () {
                this.fetchCollection();
            });
        },
        render: function () {
            this.$el.html(this.template);
            return this;
        },
        fetchCollection: function () {
            var that = this;
            console.log("Friends panel collection fetch");
            this.collection.fetch({
                data: {api_key: settings.get('apiKey')},
                reset: true,
                success: function (collection, response, options) {
                    console.log('Friends collection fetch success');
                    that.showFriends();
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });
        },

        showFriends: function () {
            var that = this;
            $('#friends').empty();
            this.collection.each(function (userModel) {
                    userModel.set('isFriend', true).set('showDeleteButton', true);
                    that.addUserCardToFriendsPanel(userModel)
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        },
        addUserCardToFriendsPanel: function (userModel) {
            var userCardView = new UserCardView({model: userModel});
            $('#friends').append(userCardView.render().el);
        },
        removeFriend: function (event) {
            var data = {api_key: settings.get('apiKey')};
            var user_id = $(event.currentTarget).data('id');
            console.log('removeFriend :', user_id);
            $.ajax({
                url: settings.get('removeFriend') + user_id,
                data: data,
                type: 'DELETE',
                success: function () {
                    console.log('removeFriend success');
                    eventDispatcher.trigger('searchUsersPanelView:fetchUsersCollection');
                    eventDispatcher.trigger('myFriendsPanelView:fetchCollection');
                },
                error: function () {
                    console.log('removeFriend error');
                }
            });
        }
    });
});

