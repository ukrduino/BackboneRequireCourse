define(['underscore', 'backbone', 'settings',  'userModel'], function (_, Backbone,  settings, UserModel) {

    return Backbone.Collection.extend({
            url: settings.get('friends'),
            model: UserModel,
            initialize: function () {
            }
        }
    )
});
