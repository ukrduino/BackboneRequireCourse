define(['underscore',
        'jquery',
        'backbone',
        'settings',
        'eventDispatcher',
        'userModel',
        'friendsCollection'],
    function (_, $, Backbone, settings, eventDispatcher, UserModel, FriendsCollection) {
        var loggedInUser = UserModel.extend({
            setUserData: function (responseJson) {
                if (typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("loggedInUser", JSON.stringify(responseJson));
                } else {
                    console.log('Sorry! No Web Storage support..');
                }
                this.set(responseJson);
                return this;
            },
            collection: new FriendsCollection(),

            initialize: function () {
                this.listenTo(this.collection, 'reset', function () {
                    eventDispatcher.trigger('LoggedInUser:friendsCollectionUpdated')
                });
                this.listenTo(eventDispatcher, 'userModel:successRemoveFromFriend', function () {
                    this.getFriends();
                });
                this.listenTo(eventDispatcher, 'userModel:successAddToFriends', function () {
                    this.getFriends();
                })
            },
            getFriends: function () {
                this.collection.fetch({
                    data: {api_key: settings.get('apiKey')},
                    reset: true,
                    success: function (collection, response, options) {
                        console.log('Friends collection fetch success', collection);
                    },
                    error: function (collection, response, options) {
                        console.log('error');
                    }
                })
            },
            removeFromFriend: function (user_id) {
                var data = {api_key: settings.get('apiKey')};
                $.ajax({
                    url: settings.get('removeFriend') + user_id,
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
                if (!this.checkUserIsFriend(user_id) && this.get('id') != user_id) {
                    var data = {api_key: settings.get('apiKey')};
                    data['user_id'] = user_id;
                    $.ajax({
                        url: settings.get('addFriend'),
                        data: data,
                        type: 'POST',
                        success: function () {
                            eventDispatcher.trigger('userModel:successAddToFriends');
                        },
                        error: function () {
                            console.log('add_friend error');
                        }
                    });
                }else{
                    console.log("User with id:" + user_id + " already in friends, or its your id!");
                }
            },
            checkUserIsFriend: function (user_id) {
                return !_.isUndefined(this.collection.get(user_id))
            }
        });
        return new loggedInUser();
    }
);
