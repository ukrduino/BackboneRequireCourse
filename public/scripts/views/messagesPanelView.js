/**
 *    Message Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'messageView',
    'text!../../templates/messagesPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, MessageView, messagesPanelTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        events:{
            'click #postMessage': 'postMessage'
        },
        initialize: function () {
        },
        render: function () {
            console.log("MainView render");
            $('#contentPanel').remove();
            this.$el.append(_.template(messagesPanelTemplate));
        },
        postMessage: function () {
            var that = this; // saving context to that variable
            var data = {
                'api_key': settings.get('apiKey'),
                "record_type": $('#type').val(),
                "subject": $('#subject').val(),
                "description": $('#description').val(),
                // TODO implement receiver ajax search by name
                "receiver_id": $('#receiver').val()
            };
            if (data['record_type'] === 'image'){
                data['image_url'] = $('#attach_url').val()
            }
            if (data['record_type'] === 'video'){
                data['video_url'] = $('#attach_url').val()
            }
            $.post(settings.get('wallPosts'), data, function (response) {
                console.log("success");
                // TODO  addMessageToWall should be here
            }, this).fail(function (response) {
                // TODO why it fails !!!!
                console.log("fail");
                that.addMessageToWall(response['responseText']);
            });
        },
        addMessageToWall: function (messageJSON) {
            console.log('addMessageToWall');
            var messageView = new MessageView(messageJSON);
            $('#messages').append(messageView.render(messageJSON).el);
        }
    });
});

