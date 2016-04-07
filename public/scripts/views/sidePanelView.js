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
        el: '#sidePanel',
        template: _.template(sidePanelTemplate),
        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.empty();
            this.$el.html(this.template(LoggedInUser.toJSON()));
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
            return this;
        }
    });
});

