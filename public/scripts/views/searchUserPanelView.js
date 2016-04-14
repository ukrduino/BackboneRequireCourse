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
    'text!../../templates/searchUsersPanel.html', 'paginatedCollection',
    'bootstrap'], function (_,
                            $,
                            Backbone,
                            settings,
                            eventDispatcher,
                            UserModel,
                            LoggedInUser,
                            UsersCollection,
                            UserCardView,
                            searchUsersPanelTemplate,
                            PaginatedCollection) {

    return Backbone.View.extend({
        id: 'userSearchPanel',
        template: _.template(searchUsersPanelTemplate),
        usersCollection: new UsersCollection(),
        events: {
            "click .addFriend": 'addFriend',
            "click .viewProfile": 'viewProfile',
            "click #search": 'searchBy',
            "click .usersPaginationLink": 'setCollectionPage'
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            this.stopListening();
            this.paginatedUsersCollection.destroy()
        },

        initialize: function () {
            this.paginatedUsersCollection = new PaginatedCollection(this.usersCollection, {perPage: settings.get('numberOfUserOnSearchPage')});
            this.listenTo(this.usersCollection, 'reset', function () {
                this.createPagination();
                this.paginatedUsersCollection.setPage(0);
                this.showUsers();
            });

            this.listenTo(eventDispatcher, 'LoggedInUser:friendsCollectionUpdated', function () {
                this.showUsers();
            });

            this.listenTo(eventDispatcher, 'UserSearchPanel:successSearchBy', function (responseUserData) {
                this.firstNameInput.val('');
                this.lastNameInput.val('');
                this.usersCollection.reset(responseUserData);
            });
            this.render();
            this.firstNameInput = $('#firstNameInput');
            this.lastNameInput = $('#lastNameInput');
            //this.firstNameInput.keyup(['firstName'], this.searchBy);
            //this.lastNameInput.keyup(['lastName'], this.searchBy);
        },

        render: function () {
            $('#contentBlock').append(this.$el.html(this.template));
        },

        showUsers: function () {
            var that = this;
            $('#users').empty();
            this.paginatedUsersCollection.each(function (userModel) {
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

        viewProfile: function (event) {
            var user_id = $(event.currentTarget).data('id');
            Backbone.history.navigate('#profile/' + user_id, {trigger: true})
        },
        searchBy: function () {
            var data = {
                api_key: settings.get('apiKey')
            };

            if (this.firstNameInput.val().length > 0) {
                data['first_name'] = this.firstNameInput.val();
            }
            if (this.lastNameInput.val().length > 0) {
                data['last_name'] = this.lastNameInput.val();
            }
            //if (data['last_name'] || data['first_name']) {
            $.ajax({
                url: settings.get('usersSearchUrl'),
                type: 'GET',
                data: data,
                success: function (responseUserData) {
                    eventDispatcher.trigger("UserSearchPanel:successSearchBy", responseUserData)
                },
                error: function (result) {
                    console.log("error: ", result.responseText);
                }
            });
            //}
        },
        createPagination: function () {
            var pagination = $('#usersPagination');
            pagination.empty();
            if (this.paginatedUsersCollection.getNumPages() > 1) {
                if (this.paginatedUsersCollection.length > 0) {
                    var numberOfPage = this.paginatedUsersCollection.getNumPages();
                    for (var i = 0; i < numberOfPage; i++) {
                        pagination.append("<li id=" + i + "><a class='usersPaginationLink' href='#' data-page=" + i + ">" + (i + 1) + "</a></li>");
                    }
                }
            }
        },
        setCollectionPage: function (event) {
            event.preventDefault();
            var page = $(event.currentTarget).data('page');
            this.paginatedUsersCollection.setPage(page);
            $('li').removeClass('active');
            $('li#' + page).addClass('active');
            this.showUsers();
        }
    });
});

