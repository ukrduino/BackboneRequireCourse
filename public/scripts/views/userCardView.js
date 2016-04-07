/**
 *    User Card View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'text!../../templates/friendCard.html',
    'text!../../templates/userCard.html',
    'bootstrap'], function (_, $, Backbone, settings, friendCardTemplate, userCardTemplate) {

    return Backbone.View.extend({
        userTemplate: _.template(userCardTemplate),
        friendTemplate: _.template(friendCardTemplate),
        initialize: function () {
        },
        render: function () {
            //this.model.processDates();
            if (this.model.get('showDeleteButton')) {
                this.$el.html(this.friendTemplate(this.model.toJSON()));
            } else {
                this.$el.html(this.userTemplate(this.model.toJSON()));
            }
            return this;
        }
    });
});