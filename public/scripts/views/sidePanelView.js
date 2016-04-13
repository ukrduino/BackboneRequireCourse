/**
 *    Side Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'userModel',
    'loggedInUser',
    'eventDispatcher',
    'text!../../templates/sidePanel.html',
    'bootstrap'], function (_, $, Backbone, UserModel, LoggedInUser, eventDispatcher,sidePanelTemplate) {

    return Backbone.View.extend({
        id: 'sidePanel',
        template: _.template(sidePanelTemplate),
        initialize: function (id) {
            if(id == LoggedInUser.get('id')){
                this.user = LoggedInUser;
                this.render();
            }else{
                this.user = new UserModel();
                this.user.getUserById(id);
            }
            this.listenTo(eventDispatcher, 'UserModel:successGetUserById', function (user) {
                this.render();
            });
        },
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            this.stopListening();
            console.log('sidePanel view onClose');
        },

        render: function () {
            console.log("sidePanel view render");
            $('#contentBlock').append(this.$el.html(this.template(this.user.toJSON())));
            // enable Bootstrap tooltips after rendering
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
});

