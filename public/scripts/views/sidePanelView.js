/**
 *    Side Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'loggedInUser',
    'text!../../templates/sidePanel.html',
    'bootstrap'], function (_, $, Backbone, LoggedInUser, sidePanelTemplate) {

    return Backbone.View.extend({
        id: 'sidePanel',
        template: _.template(sidePanelTemplate),
        initialize: function () {
            console.log("sidePanel view render");
            this.render();
        },
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('sidePanel view onClose');
        },

        render: function () {
            console.log("sidePanel view render");
            $('#contentBlock').append(this.$el.html(this.template(LoggedInUser.toJSON())));
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
});

