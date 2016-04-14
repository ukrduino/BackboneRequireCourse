/**
 *    Main Page View
 */

define([
    'jquery',
    'backbone',
    'sidePanelView',
    'tweetsPanelView'], function ($, Backbone, SidePanelView, TweetsPanelView) {

    return Backbone.View.extend({

        initialize: function (id) {
            this.user_id = id;
            this.childViews = [];
            this.render();
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

            // colling close() on all subviews
            this.childViews.forEach(function (view) {
                view.close();
            });
        },

        render: function () {
            /*
             * adding our child views in childView array
             */
            this.childViews[0] = new SidePanelView(this.user_id);
            this.childViews[1] = new TweetsPanelView(this.user_id);
        }
    });
});



