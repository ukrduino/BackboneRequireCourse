/**
 *    Message View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'text!../../templates/message.html',
    'bootstrap'], function (_, $, Backbone, settings, messageTemplate) {

    return Backbone.View.extend({
        //TODO implement message editing
        events:{
            'click #editMessage': 'editMessage'
        },
        template: _.template(messageTemplate),
        initialize: function () {

        },
        render: function (messageJson) {
            console.log("Message render: " + messageJson);
            this.$el.html(this.template(JSON.parse(messageJson)));
            return this;
        }
    });
});


