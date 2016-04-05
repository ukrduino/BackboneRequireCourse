/**
 *    Search Users Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'usersCollection',
    'userCardView',
    'text!../../templates/searchUsersPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, LoggedInUser, UsersCollection, UserCardView, searchUsersPanelTemplate) {

    return Backbone.View.extend({
        el: '#userSearchPanel',
        template: _.template(searchUsersPanelTemplate),
        collection: new UsersCollection(),

        initialize: function () {
            this.render();
            this.listenTo(this.collection, "change reset add remove", this.showUsers());
            var that = this;
            console.log("User Search panel initialize fetch");
            this.collection.fetch({
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
        render: function () {
            console.log("Users Search panel render");
            this.$el.html(this.template);
            return this;
        },
        showUsers: function () {
            var that = this;
            this.collection.each(function (userModel) {
                    userModel.set('isFriend', false);
                    that.addUserCardToUsersSearchPanel(userModel)
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        },
        addUserCardToUsersSearchPanel: function (userModel) {
            var userCardView = new UserCardView({model: userModel});
            $('#users').append(userCardView.render().el);
        }
    });
});

