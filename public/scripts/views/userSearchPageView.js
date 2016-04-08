/**
 *    User Search Page View
 */

define([
    'jquery',
    'backbone',
    'myFriendsPanelView',
    'searchUserPanelView'], function ($, Backbone, MyFriendsPanelView, SearchUserPanelView) {

    return Backbone.View.extend({

        initialize: function () {
            this.childViews = [];
        },

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            console.log('User Search Page view onClose');

            // colling close() on all subviews
            this.childViews.forEach(function (view) {
                view.close();
            })
        },

        render: function () {
            /*
             * adding our child views in childView array
             */
            this.childViews[0] = new MyFriendsPanelView();
            this.childViews[1] = new SearchUserPanelView();
        }
    });
});
