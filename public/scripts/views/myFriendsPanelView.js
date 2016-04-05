/**
 *    My Friends Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'friendsCollection',
    'userCardView',
    'text!../../templates/myFriendsPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, LoggedInUser, FriendsCollection, UserCardView, myFriendsPanelTemplate) {

    return Backbone.View.extend({
        el: '#friendsPanel',
        template:_.template(myFriendsPanelTemplate),
        collection: new FriendsCollection(),

        initialize: function () {
            this.render();
            this.listenTo(this.collection, "change reset add remove", this.showFriends());
            var that = this;
            console.log("Friends panel initialize fetch");
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

        render: function () {
            console.log("Friends panel render");
            this.$el.html(this.template);
            return this;
        },
        showFriends: function () {
            this.collection.each(function (userModel) {
                    console.log('collection.each', userModel);
                    this.addUserCardToFriendsPanel(userModel)
                }
            );
        },
        addUserCardToFriendsPanel: function (userModel) {
            console.log('addUserCardToFriendsPanel');
            var userCardView = new UserCardView({model: userModel});
            $('#friends').append(userCardView.render().el);
        }
    });
});

