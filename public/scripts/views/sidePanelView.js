/**
 *    Side Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/sidePanel.html',
    'bootstrap'], function (_, $, Backbone, sidePanelTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        initialize: function () {

        },

        render: function () {
            console.log("Side panel render");
            this.$el.empty();
            this.$el.append(_.template(sidePanelTemplate));
        }
    });
});

