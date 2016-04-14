/**
 *    My Friends Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'userCardView',
    'text!../../templates/myFriendsPanel.html', 'paginatedCollection',
    'bootstrap'], function (_,
                            $,
                            Backbone,
                            settings,
                            eventDispatcher,
                            LoggedInUser,
                            UserCardView,
                            myFriendsPanelTemplate,
                            PaginatedCollection) {

    return Backbone.View.extend({
        id: 'friendsPanel',
        template: _.template(myFriendsPanelTemplate),
        events: {
            "click .removeFriend": 'removeFriend',
            "click .viewProfile": 'viewProfile',
            "click #friendsFilterToggle": 'friendsFilterToggle',
            "keyup .friendsFilterFields": "search",
            "click .friendsPaginationLink": 'setCollectionPage'
        },
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            this.paginatedFriendsCollection.destroy();
            this.stopListening();
        },
        initialize: function () {
            //Just add below JQuery code snippet in your javascript file and voila, you can now handler ‘show’/’hide’ events
            $.each(['show', 'hide'], function (i, ev) {
                var el = $.fn[ev];
                $.fn[ev] = function () {
                    this.trigger(ev);
                    return el.apply(this, arguments);
                };
            });
            this.paginatedFriendsCollection = new PaginatedCollection(LoggedInUser.collection,
                {perPage: settings.get('numberOfFriendsOnSearchPage')});
            this.paginatedFriendsCollection.setPage(0);
            this.render();
            this.showFriends();
            this.listenTo(eventDispatcher, 'LoggedInUser:friendsCollectionUpdated', function () {
                $('#friendsCount').html(LoggedInUser.collection.length);
                $('#friendsFilter').hide();
                this.paginatedFriendsCollection.setPerPage(settings.get('numberOfFriendsOnSearchPage'));
                this.createPagination();
                this.showFriends();
            });
            this.listenTo(eventDispatcher, 'myFriendsPanelView:friendsFilterClosed', function () {
                this.paginatedFriendsCollection.setPerPage(settings.get('numberOfFriendsOnSearchPage'));
                this.createPagination();
                this.showFriends();
            });
        },
        render: function () {
            $('#contentBlock').append(this.$el.html(this.template));
            $('#friendsCount').html(LoggedInUser.collection.length);
            $('#friendsFilter').on('hide', function() {
                eventDispatcher.trigger('myFriendsPanelView:friendsFilterClosed');
            }).hide();
            this.createPagination();
        },

        showFriends: function () {
            $('#friends').empty();
            this.paginatedFriendsCollection.each(function (userModel) {
                    userModel.set('isFriend', true).set('showDeleteButton', true);
                    var userCardView = new UserCardView({model: userModel});
                    $('#friends').append(userCardView.render().el);
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        },

        removeFriend: function (event) {
            var user_id = $(event.currentTarget).data('id');
            LoggedInUser.removeFromFriend(user_id);
        },

        viewProfile: function (event) {
            var user_id = $(event.currentTarget).data('id');
            Backbone.history.navigate('#profile/' + user_id, {trigger: true});
        },
        friendsFilterToggle: function () {
            $('.friendsFilterFields').val('');
            $('#friendsFilter').toggle();
            $('#friendsPagination').toggle();
            this.createPagination();
        },
        search: function (event) {
            var currentInputField = $(event.currentTarget);
            $('.friendsFilterFields').not(currentInputField).val('');
            var field = currentInputField.data('field');
            var letters = currentInputField.val();
            this.showFilteredFriends(LoggedInUser.collection.search(letters, field));
        },
        showFilteredFriends: function (filteredFriendsCollection) {
            $('#friends').empty();
            filteredFriendsCollection.each(function (userModel) {
                    userModel.set('isFriend', true).set('showDeleteButton', true);
                    var userCardView = new UserCardView({model: userModel});
                    $('#friends').append(userCardView.render().el);
                }
            );
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        },
        createPagination: function () {
            var pagination = $('#friendsPagination');
            pagination.empty();
            if (this.paginatedFriendsCollection.getNumPages() > 1) {
                if (this.paginatedFriendsCollection.length > 0) {
                    var numberOfPage = this.paginatedFriendsCollection.getNumPages();
                    for (var i = 0; i < numberOfPage; i++) {
                        pagination.append("<li id=" + i + "><a class='friendsPaginationLink' href='#' data-page=" + i + ">" + (i + 1) + "</a></li>");
                    }
                    $('li').removeClass('active');
                    $('li#0').addClass('active');
                }
            }
        },
        setCollectionPage: function (event) {
            event.preventDefault();
            var page = $(event.currentTarget).data('page');
            this.paginatedFriendsCollection.setPage(page);
            $('li').removeClass('active');
            $('li#' + page).addClass('active');
            this.showFriends();
        }
    });
});

