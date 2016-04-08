/**
 *    Message Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'messageModel',
    'messagesCollection',
    'messageView',
    'text!../../templates/messagesPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, MessageModel, MessagesCollection, MessageView, messagesPanelTemplate) {

    return Backbone.View.extend({
        id: 'messagesPanel',
        events: {
            'click #postMessage': 'postMessage'
        },
        wallPostsCollection: new MessagesCollection(),

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('messagesPanel view onClose');
            clearInterval(this.timer);
            this.stopListening();
        },


        initialize: function () {
            var that = this;
            this.listenTo(this.wallPostsCollection, 'reset', function () {
                this.updateMessageWall()
            });
            this.timer = setInterval(function() {
                that.fetchWallPostsCollection();
            }, 5000);
            this.render();
            console.log("Message panel initialize fetch");
            this.fetchWallPostsCollection();
        },

        fetchWallPostsCollection: function () {
            this.wallPostsCollection.fetch({
                data: {api_key: 'd4cd9757001b363cca9dc7e1ea06439f47bb02ac'},
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
            console.log("Message panel render");
            $('#contentBlock').append(this.$el.html(_.template(messagesPanelTemplate)));
        },
        updateMessageWall: function () {
            $('#messages').empty();
            var that = this;
            var messages = _.last(this.wallPostsCollection.toArray(), [settings.get('numberOfMessagesOnWall')]);
            messages.forEach(function (model) {
                that.addMessageToWall(model)
                }
            );
        },
        postMessage: function () {
            var subjectField = $('#subject');
            var descriptionField = $('#description');
            var receiverField = $('#receiver');
            var attachField = $('#attach_url');

            var data = {
                'api_key': settings.get('apiKey'),
                "record_type": $('#type').val(),
                "subject": subjectField.val(),
                "description": descriptionField.val(),
                // TODO implement receiver ajax search by name
                "receiver_id": receiverField.val()
            };
            if (data['record_type'] === 'image') {
                data['image_url'] = attachField.val()
            }
            if (data['record_type'] === 'video') {
                data['video_url'] = attachField.val()
            }
            subjectField.val('');
            descriptionField.val('');
            receiverField.val('');
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
        }
    });
});

