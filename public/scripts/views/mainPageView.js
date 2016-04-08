/**
 *    Main Page View
 */

define([
    'jquery',
    'backbone',
    'sidePanelView',
    'messagesPanelView'], function ($, Backbone, SidePanelView, MessagesPanelView) {

    return Backbone.View.extend({

        initialize: function () {
            this.childViews = [];
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('Main Page view onClose');

            // colling close() on all subviews
            this.childViews.forEach(function (view) {
                view.close();
            });
        },

        render: function () {
            /*
             * adding our child views in childView array
             */
            this.childViews[0] = new SidePanelView();
            this.childViews[1] = new MessagesPanelView();
        }
    });
});


