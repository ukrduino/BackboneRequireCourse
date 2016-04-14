/**
 *    Edit Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'datepicker',
    'loggedInUser',
    'text!../../templates/editProfileForm.html',
    'bootstrap'], function (_, $, Backbone, settings, datepicker, LoggedInUser, editProfileFormTemplate) {

    return Backbone.View.extend({
        id: 'editProfile',
        template: _.template(editProfileFormTemplate),
        events: {
            'click #saveProfile': 'updateProfile'
        },
        initialize: function () {

        },
        onClose: function () {
            // unbind all events from models, collections here!!!
            //https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
        },
        render: function () {
            $('#contentBlock').append(this.$el.html(this.template(LoggedInUser.toJSON())));
            $('#birthday').datepicker();
        },

        updateProfile: function () {
            var loggedInUserData = LoggedInUser.toJSON();
            var data = {};
            data['first_name'] = $('#first_name').val();
            data['last_name'] = $('#last_name').val();
            data['birthday'] = $('#birthday').val();
            data['phone'] = $('#phone').val();
            data['address'] = $('#address').val();
            data['image_url'] = $('#image_url').val();
            data['twitter'] = $('#twitter').val();
            data['description'] = $('#description').val();
            data['status'] = $('#status').val();
            data['gender'] = $('#gender').val();

            for (var property in data) {
                if (data[property] == loggedInUserData[property] || data[property] === "") {
                    delete data[property];
                }
            }
            if (data['birthday']) {
                data['birthday'] = new Date(data['birthday']);
            }

            var updateUrl = settings.get('usersUrl') + LoggedInUser.get('id');
            data['api_key'] = settings.get('apiKey');

            $.ajax({
                url: updateUrl,
                type: 'PUT',
                data: data,
                success: function (result) {
                    LoggedInUser.setUserData(result);
                    Backbone.history.navigate('profile/',{trigger: true});
                },
                error: function (answer) {
                    console.log( "error: ", answer.responseText );
                }
            });
        }
    });
});
