/**
 *    Header panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'eventDispatcher',
    'loggedInUser',
    'router',
    'text!../../templates/header.html',
    'bootstrap'], function (_, $, Backbone, settings, eventDispatcher, LoggedInUser, Router, headerTemplate) {

    var HeaderView =  Backbone.View.extend({
        el: $('#header'),
        template: _.template(headerTemplate),

        initialize: function () {
            LoggedInUser.on('change', this.render, this);
            this.listenTo(eventDispatcher, 'HeaderView:render', this.render)
        },
        render: function () {
            this.$el.html(this.template(LoggedInUser));
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
            return this;
        }
    });
    return new HeaderView();
});
