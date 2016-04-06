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

        initialize: function () {
            this.render();
            this.fetchCollection();
            this.listenTo(eventDispatcher,'update_friends_panel', function () {
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
                    userModel.set('isFriend', true);
                    that.addUserCardToFriendsPanel(userModel)
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        },
        addUserCardToFriendsPanel: function (userModel) {
            var userCardView = new UserCardView({model: userModel});
            $('#friends').append(userCardView.render().el);
        }
    });
});

