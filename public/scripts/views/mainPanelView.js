/**
 *    Main Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/mainPanel.html',
    'bootstrap'], function (_, $, Backbone, mainPanelTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        initialize: function () {

        },
        render: function () {
            console.log("MainView render");
            this.$el.append(_.template(mainPanelTemplate));
        }
    });
});

