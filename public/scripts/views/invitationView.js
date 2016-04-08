/**
 *    Invitation panel View (Singletone as its always static)
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/invitationPanel.html',
    'bootstrap'], function (_, $, Backbone, invitationPanelTemplate) {

    return Backbone.View.extend({
        id: 'invitationBlock',
        template: _.template(invitationPanelTemplate),
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('invitation view onClose');
        },
        render: function () {
            $('#contentBlock').append(this.$el.html(this.template));
        }
    });
});

