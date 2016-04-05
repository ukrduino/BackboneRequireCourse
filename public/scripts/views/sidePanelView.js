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
        template:_.template(sidePanelTemplate),
        initialize: function () {
            this.render();
        },

        render: function () {
            console.log("Side panel render");
            this.$el.empty();
            this.$el.html(this.template(LoggedInUser.toJSON()));
            return this;
        }
    });
});

