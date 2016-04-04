/**
 *    Invitation panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/invitationPanel.html',
    'bootstrap'], function (_, $, Backbone, invitationPanelTemplate) {

    var InvitationView = Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(invitationPanelTemplate),

        initialize: function () {
            console.log("invitationView initialize and set events");
            Backbone.on('show_invitationPanel', this.render, this)
        },
        render: function () {
            console.log("invitationView render");
            this.$el.html(this.template());
        }
    });
    return new InvitationView();
});

