/**
 *    Message Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'messageModel',
    'messagesCollection',
    'messageView',
    'text!../../templates/messagesPanel.html', 'paginatedCollection',
    'bootstrap'], function (_,
                            $,
                            Backbone,
                            settings,
                            LoggedInUser,
                            MessageModel,
                            MessagesCollection,
                            MessageView,
                            messagesPanelTemplate,
                            PaginatedCollection) {

    return Backbone.View.extend({
        id: 'messagesPanel',
        events: {
            'click #postMessage': 'postMessage',
            "click .messagePaginationLink": 'setCollectionPage'
        },
        wallPostsCollection: new MessagesCollection(),

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('messagesPanel view onClose');
            clearInterval(this.timer);
            this.stopListening();
        },

        initialize: function (id) {
            this.paginatedMessageCollection = new PaginatedCollection(this.wallPostsCollection,
                {perPage: settings.get('numberOfMessagesOnWall')});
            this.listenTo(this.wallPostsCollection, 'reset', function () {
                this.createPagination();
                this.paginatedMessageCollection.setPage(0);
                this.updateMessageWall();
            });
            this.user_id = id;
            var that = this;
            this.timer = setInterval(function () {
                that.fetchWallPostsCollectionSearch(that.user_id);
            }, 5000);

            this.render();
            this.fetchWallPostsCollectionSearch(that.user_id);

        },

        fetchWallPostsCollectionSearch: function (user_id) {
            var data = {
                api_key: settings.get('apiKey'),
                receiver_id: user_id
            };
            this.wallPostsCollection.fetch({
                data: data,
                reset: true,
                success: function (collection, response, options) {
                    console.log('fetchWallPostsCollection success');
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });
        },
        render: function () {
            $('#contentBlock').append(this.$el.html(_.template(messagesPanelTemplate)));
            if (this.user_id == LoggedInUser.get('id')) {
                $('#postMessageArea').empty();
            }
        },
        updateMessageWall: function () {
            $('#messages').empty();
            var that = this;
            this.paginatedMessageCollection.each(function (model) {
                that.addMessageToWall(model);
            });
        },
        postMessage: function () {
            var subjectField = $('#subject');
            var descriptionField = $('#description');
            var attachField = $('#attach_url');

            var data = {
                'api_key': settings.get('apiKey'),
                "record_type": $('#type').val(),
                "subject": subjectField.val(),
                "description": descriptionField.val(),
                "receiver_id": this.user_id
            };
            if (data['record_type'] === 'image') {
                data['image_url'] = attachField.val()
            }
            if (data['record_type'] === 'video') {
                data['video_url'] = attachField.val()
            }
            subjectField.val('');
            descriptionField.val('');
            attachField.val('');
            var newMessage = new MessageModel(data);
            newMessage.save({}, {
                success: function (model, response) {
                    console.log('success', response);
                },
                error: function (model, response) {
                    console.log('error', response);
                }
            });
        },
        addMessageToWall: function (messageModel) {
            var messageView = new MessageView({model: messageModel});
            $('#messages').append(messageView.render().el);
        },

        createPagination: function () {
            var pagination = $('#messagesPagination');
            pagination.empty();
            if (this.paginatedMessageCollection.getNumPages() > 1) {
                if (this.paginatedMessageCollection.length > 0) {
                    var numberOfPage = this.paginatedMessageCollection.getNumPages();
                    for (var i = 0; i < numberOfPage; i++) {
                        pagination.append("<li id=" + i + "><a class='messagePaginationLink' href='#' data-page=" + i + ">" + (i + 1) + "</a></li>");
                    }
                }
            }
        },
        setCollectionPage: function (event) {
            event.preventDefault();
            var page = $(event.currentTarget).data('page');
            this.paginatedMessageCollection.setPage(page);
            $('li').removeClass('active');
            $('li#' + page).addClass('active');
            this.updateMessageWall();
        }
    });
});

