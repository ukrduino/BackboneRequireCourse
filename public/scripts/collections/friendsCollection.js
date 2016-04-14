define(['underscore',
    'backbone',
    'settings',
    'userModel'], function (_,
                            Backbone,
                            settings,
                            UserModel) {

    return Backbone.Collection.extend({
            url: settings.get('getFriends'),
            model: UserModel,
            initialize: function () {
            },
            search: function (letters, field) {
                if (letters == "") return this;
                var pattern = new RegExp(letters, "gi");
                return _(this.filter(function (data) {
                    return pattern.test(data.get(field));
                }));
            }
        }
    )
});
