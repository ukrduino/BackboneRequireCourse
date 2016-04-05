/**
 *    Header panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'router',
    'text!../../templates/header.html',
    'bootstrap'], function (_, $, Backbone, settings, LoggedInUser, Router, headerTemplate) {

    var HeaderView =  Backbone.View.extend({
        el: $('#header'),
        template: _.template(headerTemplate),

        initialize: function () {
            console.log("headerView initialize and set events");
            LoggedInUser.on('change', this.render, this);
            Backbone.on('build_header', this.render, this)
        },
        render: function () {
            console.log("headerView render with user:" + LoggedInUser.get('first_name'));
            this.$el.html(this.template(LoggedInUser));
            return this;
        }
    });
    return new HeaderView();
});
