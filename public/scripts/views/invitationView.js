/**
 *    Invitation panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'eventDispatcher',
    'text!../../templates/invitationPanel.html',
    'bootstrap'], function (_, $, Backbone, eventDispatcher, invitationPanelTemplate) {

    var InvitationView = Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(invitationPanelTemplate),

        initialize: function () {
            this.listenTo(eventDispatcher, 'InvitationView:render', this.render)
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return new InvitationView();
});

