/**
 *    Search Users Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'userModel',
    'loggedInUser',
    'usersCollection',
    'friendsCollection',
    'userCardView',
    'text!../../templates/searchUsersPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, eventDispatcher, UserModel, LoggedInUser, UsersCollection, FriendsCollection, UserCardView, searchUsersPanelTemplate) {

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
            this.listenTo(eventDispatcher, 'userModel:successAddToFriends userModel:successRemoveFromFriend', function () {
                this.fetchUsersCollection();
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
            var user = new UserModel();
            user.addToFriends(user_id);
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

