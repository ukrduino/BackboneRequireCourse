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
        el: $('#contentBlock'),
        sideTemplate:_.template(sidePanelTemplate),
        initialize: function () {

        },

        render: function () {
            console.log("Side panel render");
            this.$el.empty();
            this.$el.append(this.sideTemplate(LoggedInUser.toJSON()));
        }
    });
});

