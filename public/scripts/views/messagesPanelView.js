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
        el: $('#contentBlock'),
        events: {
            'click #postMessage': 'postMessage'
        },
        collection: new MessagesCollection(),
        initialize: function () {
            var that = this;
            console.log("Message panel initialize fetch");
            this.collection.fetch({
                data: {api_key: settings.get('apiKey')},
                reset: true,
                success: function (collection, response, options) {
                    that.render();
                    console.log('success');
                    collection.each(function (model) {
                            console.log('collection.each', model);
                            that.addMessageToWall(model)
                        }
                    );
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });
        },
        render: function () {
            console.log("Message panel render");
            $('#contentPanel').remove();
            this.$el.append(_.template(messagesPanelTemplate));
            return this;
        },
        postMessage: function () {
            var that = this; // saving context to that variable
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
                    that.addMessageToWall(model);
                    //that.addMessageToWall(new MessageModel(response));
                },
                error: function (model, response) {
                    console.log('error', response);
                }
            });
        },
        addMessageToWall: function (messageModel) {
            console.log('addMessageToWall');
            var messageView = new MessageView({model: messageModel});
            $('#messages').append(messageView.render().el);
        }
    });
});

