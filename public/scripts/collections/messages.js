define(['underscore', 'backbone', 'settings',  'messageModel'], function (_, Backbone,  settings, MessageModel) {

    return Backbone.Collection.extend({
            url: settings.get('wallPosts'),
            model: MessageModel,
            initialize: function () {
            }
        }
    )
});


