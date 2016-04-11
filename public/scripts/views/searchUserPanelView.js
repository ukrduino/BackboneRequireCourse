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
    'userCardView',
    'text!../../templates/searchUsersPanel.html',
    'bootstrap'], function (_,
                            $,
                            Backbone,
                            settings,
                            eventDispatcher,
                            UserModel,
                            LoggedInUser,
                            UsersCollection,
                            UserCardView,
                            searchUsersPanelTemplate) {

    return Backbone.View.extend({
        id: 'userSearchPanel',
        template: _.template(searchUsersPanelTemplate),
        usersCollection: new UsersCollection(),
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
            this.listenTo(eventDispatcher, 'LoggedInUser:friendsCollectionUpdated', function () {
                this.showUsers();
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
            $('#users').empty();
            this.usersCollection.each(function (userModel) {
                    if (LoggedInUser.checkUserIsFriend(userModel.get('id'))) {
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
        addUserCardToUsersSearchPanel: function (userModel) {
            var userCardView = new UserCardView({model: userModel});
            $('#users').append(userCardView.render().el);
        },
        addFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
            LoggedInUser.addToFriends(user_id);
        },
// TODO implement parameters search
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
            Backbone.history.navigate('#profile/' + user_id, {trigger: true})
        }
    });
});

