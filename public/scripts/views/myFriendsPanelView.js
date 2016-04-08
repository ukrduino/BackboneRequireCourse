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
        id: 'friendsPanel',
        template: _.template(myFriendsPanelTemplate),
        collection: new FriendsCollection(),
        events: {
            "click .removeFriend": 'removeFriend',
            "click .viewProfile": 'viewProfile'
        },
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('friendsPanel view onClose');
            this.stopListening();
        },
        initialize: function () {
            this.render();
            this.fetchCollection();
            this.listenTo(eventDispatcher, 'myFriendsPanelView:fetchCollection', function () {
                this.fetchCollection();
            });
            this.listenTo(eventDispatcher, 'myFiendsPanelView:makeRemoveFriendRequest', function (user_id) {
                this.makeRemoveFriendRequest(user_id);
            });
        },
        render: function () {
            console.log("Users Search panel render");
            $('#contentBlock').append(this.$el.html(this.template));
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
            var user_id = $(event.currentTarget).data('id');
            console.log('removeFriend :', user_id);
            this.makeRemoveFriendRequest(user_id)
        },
        makeRemoveFriendRequest: function (user_id) {
            var data = {api_key: settings.get('apiKey')};
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
        },
        viewProfile: function (event) {
            var user_id = $(event.currentTarget).data('id');
            Backbone.history.navigate('#profile/' + user_id, {trigger: true});
            var userDataJson = this.collection.get(user_id).toJSON();
            userDataJson['loggedInUser'] = false;
            eventDispatcher.trigger('router:showUserProfilePage', userDataJson);
        }
    });
});

