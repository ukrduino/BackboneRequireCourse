define(['underscore', 'backbone', 'settings','moment', 'eventDispatcher'], function (_, Backbone, settings, moment, eventDispatcher) {

    return Backbone.Model.extend({
            defaults: {
                'first_name': null,
                'last_name': null,
                'email': null,
                'birthday': null,
                'phone': null,
                'address': null,
                'image_url': null,
                'twitter': null,
                'description': null,
                'status': null,
                'gender': null,
                'age': null,
                'created_at': null,
                'encrypted_password': null,
                'id': null,
                'person_id': null,
                'updated_at': null
            },
            dateFields: [
                'birthday',
                'created_at',
                'updated_at'
            ],

            processDate: function (dateField) {
                if (this.get(dateField)) {
                    var momentDate = moment(this.get(dateField));
                    this.set(dateField, momentDate.format("DD.MM.YYYY"), {silent: true});
                }
            },
            initialize: function () {
                this.once('change', function () {
                    _.each(this.dateFields, function (dateField) {
                        this.processDate(dateField)
                    }, this);
                });
            },
            removeFromFriend: function (user_id) {
                var data = {api_key: settings.get('apiKey')};
                var id = (typeof user_id === 'undefined') ? this.id : user_id;
                $.ajax({
                    url: settings.get('removeFriend') + id,
                    data: data,
                    type: 'DELETE',
                    success: function () {
                        console.log('removeFriend success');
                        eventDispatcher.trigger('userModel:successRemoveFromFriend');
                    },
                    error: function () {
                        console.log('removeFriend error');
                    }
                });
            },
            addToFriends: function (user_id) {
                var data = {api_key: settings.get('apiKey')};
                data['user_id'] = this.id;
                data['user_id'] = (typeof user_id === 'undefined') ? this.id : user_id;
                $.ajax({
                    url: settings.get('addFriend'),
                    data: data,
                    type: 'POST',
                    success: function () {
                        eventDispatcher.trigger('userModel:successAddToFriends');
                        Backbone.history.navigate('friends', {trigger: true});
                    },
                    error: function () {
                        console.log('add_friend error');
                    }
                });
            }
        }
    )
});

