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
        template: _.template(messageTemplate),
        initialize: function () {
        },
        render: function () {
            this.model.processDates();
            console.log("Message render: " + this.model.get('subject'));
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});


