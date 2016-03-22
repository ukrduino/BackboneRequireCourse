/**
 *    Main Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'text!../../templates/header.html',
    'text!../../templates/sidePanel.html',
    'text!../../templates/content.html',
    'bootstrap'], function (_, $, Backbone, headerTemplate, sidePanelTemplate, contentTemplate) {

    return Backbone.View.extend({
        el: $('#app'),
        initialize: function () {
            this.$header = $('#header');
            this.contentBlock = $('#contentBlock');
        },

        render: function () {
            console.log("MainView render");
            this.$header.append(_.template(headerTemplate));
            this.contentBlock.append(_.template(sidePanelTemplate));
            this.contentBlock.append(_.template(contentTemplate));
        }
    });
});

