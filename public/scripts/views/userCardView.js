/**
 *    User Card View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'text!../../templates/userCard.html',
    'bootstrap'], function (_, $, Backbone, settings, userCardTemplate) {

    return Backbone.View.extend({
        template: _.template(userCardTemplate),
        initialize: function () {
        },
        render: function () {
            //this.model.processDates();
            console.log("UserCard render: " + this.model.get('last_name'));
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});