/**
 *    Search Users Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'usersCollection',
    'friendsCollection',
    'userCardView',
    'text!../../templates/searchUsersPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, eventDispatcher, LoggedInUser, UsersCollection, FriendsCollection, UserCardView, searchUsersPanelTemplate) {

    return Backbone.View.extend({
        id: 'userSearchPanel',
        template: _.template(searchUsersPanelTemplate),
        usersCollection: new UsersCollection(),
        friendsCollection: new FriendsCollection(),
        events: {
            "click .addFriend": 'addFriend',
            "click .viewProfile": 'viewProfile'
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('sidePanel view onClose');
            this.stopListening();
        },

        initialize: function () {
            this.listenTo(eventDispatcher, 'searchUsersPanelView:fetchUsersCollection', function () {
                this.fetchUsersCollection();
            });
            this.listenTo(eventDispatcher, 'searchUsersPanelView:makeAddFriendRequest', function (user_id) {
                this.makeAddFriendRequest(user_id);
            });
            this.render();
            this.fetchUsersCollection();
        },

        render: function () {
            console.log("Users Search panel render");
            $('#contentBlock').append(this.$el.html(this.template));
        },

        showUsers: function () {
            var that = this;
            this.friendsCollection.fetch({
                data: {api_key: settings.get('apiKey')},
                reset: true,
                success: function (collection, response, options) {
                    console.log('friendsCollection fetch success');
                    $('#users').empty();
                    that.usersCollection.each(function (userModel) {
                            if (!_.isUndefined(that.friendsCollection.get(userModel.get('id')))) {
                                userModel.set('isFriend', true).set('showDeleteButton', false);
                            } else {
                                userModel.set('isFriend', false).set('showDeleteButton', false);
                            }
                            that.addUserCardToUsersSearchPanel(userModel)
                        }
                    );
                    // enable Bootstrap tooltips after rendering
                    $('[data-toggle="tooltip"]').tooltip();
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });

        },
        addUserCardToUsersSearchPanel: function (userModel) {
            var userCardView = new UserCardView({model: userModel});
            $('#users').append(userCardView.render().el);
        },
        addFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
            this.makeAddFriendRequest(user_id)
        },
        makeAddFriendRequest: function (user_id) {
            var that = this;
            var data = {api_key: settings.get('apiKey')};
            data['user_id'] = user_id;
                $.ajax({
                    url: settings.get('addFriend'),
                    data: data,
                    type: 'POST',
                    success: function () {
                        eventDispatcher.trigger('myFriendsPanelView:fetchCollection');
                        that.showUsers();
                        console.log('add_friend success');
                    },
                    error: function () {
                        console.log('add_friend error');
                    }
                });
        },
        fetchUsersCollection: function () {
            var that = this;
            this.usersCollection.fetch({
                data: {api_key: settings.get('apiKey')},
                reset: true,
                success: function (collection, response, options) {
                    console.log('Users collection fetch success');
                    that.showUsers();
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });
        },
        viewProfile: function (event) {
            var user_id = $(event.currentTarget).data('id');
            Backbone.history.navigate('#profile/' + user_id, {trigger: true});
            var userDataJson = this.usersCollection.get(user_id).toJSON();
            userDataJson['loggedInUser'] = false;
            eventDispatcher.trigger('router:showUserProfilePage', userDataJson);
        }
    });
});

