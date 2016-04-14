/**
 *    Message Panel View
 */

define(['underscore',
    'jquery',
    'backbone',
    'loggedInUser',
    'eventDispatcher',
    'userModel',
    'text!../../templates/tweetsPanel.html',
    'bootstrap'], function (_,
                            $,
                            Backbone,
                            LoggedInUser,
                            eventDispatcher,
                            UserModel,
                            tweetsPanelTemplate) {

    return Backbone.View.extend({
        id: 'tweeterPanel',
        template: _.template(tweetsPanelTemplate),

        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
            this.stopListening();
        },

        initialize: function (id) {
            if(id == LoggedInUser.get('id')){
                this.user = LoggedInUser;
                this.render();
            }else{
                this.user = new UserModel();
                this.user.getUserById(id);
            }
            this.listenTo(eventDispatcher, 'UserModel:successGetUserById', function () {
                this.render();
            });
        },

        render: function () {
            var twitter = this.user.get('twitter');
            if (twitter.length > 0){
                if (twitter.indexOf("@") > -1){
                    this.user.set('twitter', twitter.replace("@", ""))
                }
                $('#contentBlock').append(this.$el.html(this.template(this.user.toJSON())));
            }
        }
    });
});


