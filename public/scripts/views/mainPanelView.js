/**
 *    Main Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'text!../../templates/mainPanel.html',
    'bootstrap'], function (_, $, Backbone, settings, mainPanelTemplate) {

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
            this.$el.append(_.template(mainPanelTemplate));
        },
        postMessage: function () {
            var data = {
                'api_key': settings.get('apiKey'),
                "record_type": $('#type').val(),
                "subject": $('#subject').val(),
                "description": $('#description').val(),
                // TODO implement receiver ajax search by name
                "receiver_id": $('#receiver').val()
            };
            messageJSON = $.post(settings.get('wallPosts'), data, function (message) {
                console.log("success");
            }, this).fail(function () {
                // TODO why it fails !!!!
                console.log("fail");
            });
            //TODO append this message to wall
            console.log(messageJSON);
        }
    });
});

