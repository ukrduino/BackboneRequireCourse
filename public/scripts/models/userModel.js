define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'moment',
    'eventDispatcher'], function (_,
                                  $,
                                  Backbone,
                                  settings,
                                  moment,
                                  eventDispatcher) {

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
                'updated_at': null,
                'messages': 0,
                'loggedInUser': false,
                'isFriend': false
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
            getNumberOfMessages: function () {
                console.log('getNumberOfMessages');
                var that = this;
                var data = {
                    api_key: settings.get('apiKey'),
                    receiver_id: this.id
                };
                $.ajax({
                    url: settings.get('searchWallPosts'),
                    type: 'GET',
                    data: data,
                    success: function (result) {
                        var messagesNumber = Object.keys(result).length;
                        if (messagesNumber > 0) {
                            that.set('messages', messagesNumber)
                        }
                        eventDispatcher.trigger("UserModel:successGetNumberOfMessages")
                    },
                    error: function (result) {
                        console.log("error: ", result.responseText);
                    }
                });
            }
            ,
            getUserById: function (user_id) {
                console.log('getUserById');
                var that = this;
                var data = {
                    api_key: settings.get('apiKey')
                };
                $.ajax({
                    url: settings.get('usersUrl') + user_id,
                    type: 'GET',
                    data: data,
                    success: function (responseUserData) {
                        that.set(responseUserData);
                        console.log('GetUserById:', that);
                        eventDispatcher.trigger("UserModel:successGetUserById", that)
                    },
                    error: function (result) {
                        console.log("error: ", result.responseText);
                    }
                });
            }
        }
    )
});

