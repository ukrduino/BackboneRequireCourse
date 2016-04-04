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
        events: {
            'click #editMessage': 'editMessage'
        },
        template: _.template(messageTemplate),
        initialize: function () {

        },
        render: function () {
            console.log("Message render: " + this.model.get('subject'));
            this.$el.html(this.template(this.model.toJSON));
            return this;
        },
        editMessage: function () {
            console.log("editMessage");
        }
    });
});


