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
        el: '#userSearchPanel',
        template: _.template(searchUsersPanelTemplate),
        usersCollection: new UsersCollection(),
        friendsCollection: new FriendsCollection(),
        events: {
            "click .addFriend": 'addFriend',
            "click .viewProfile": 'viewProfile'
        },

        initialize: function () {
            this.listenTo(eventDispatcher, 'searchUsersPanelView:fetchUsersCollection', function () {
                this.fetchUsersCollection();
            });
            this.render();
            this.fetchUsersCollection();
        },
        render: function () {
            console.log("Users Search panel render");
            this.$el.html(this.template);
            return this;
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
            var that = this;
            var data = {api_key: settings.get('apiKey')};
            data['user_id'] = $(event.currentTarget).data('id');
            console.log(data['user_id']);
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
                    console.log('usersCollection fetch success');
                    that.showUsers();
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });
        }
    });
});

