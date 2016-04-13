define(['underscore', 'backbone', 'settings', 'messageModel'], function (_, Backbone, settings, MessageModel) {

    return Backbone.Collection.extend({
            url: settings.get('searchWallPosts'),
            model: MessageModel,
            initialize: function () {
            },
            comparator: function (model) {
                return -new Date(model.get('created_at'));
            }
        }
    )
});


