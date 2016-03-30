/**
 *    Edit Profile Page View
 */

define(['underscore',
    'jquery',
    'backbone',
    'settings',
    'loggedInUser',
    'text!../../templates/editProfileForm.html',
    'bootstrap'], function (_, $, Backbone, settings, LoggedInUser, editProfileFormTemplate) {

    return Backbone.View.extend({
        el: $('#contentBlock'),
        template: _.template(editProfileFormTemplate),
        events: {
            'click #saveProfile': 'updateProfile'
        },
        initialize: function () {

        },

        render: function () {
            console.log("editProfileView render");
            this.$el.html(this.template(LoggedInUser.toJSON()));
        },

        updateProfile: function () {

            var data = {};
            var userId = LoggedInUser.get('id');
            var updateUrl = settings.get('usersUrl') + userId;
            data['api_key'] = settings.get('apiKey');
            if (!($('#first_name input').val() === "")) { data['first_name'] = $('#first_name input').val(); }
            if (!($('#last_name input').val() === "")) { data['last_name'] = $('#last_name input').val(); }
            //if (!($('a#dob').text() === "")) {
            //    var newDate = new Date($('a#dob').text());
            //    data['birthday'] = newDate;
            //}
            if (!($('#phone').val() === "")) { data['phone'] = $('#phone').val(); }
            if (!($('#address').val() === "")) { data['address'] = $('#address').val(); }
            if (!($('#image_url').val() === "")) { data['image_url'] = $('#image_url').val(); }
            if (!($('#twitter').val() === "")) { data['twitter'] = $('#twitter').val(); }
            if (!($('#description').val() === "")) { data['description'] = $('#description').val(); }
            if (!($('#status').val() === "")) { data['status'] = $('#status').val(); }
            if (!($('#gender').val() === "")) { data['gender'] = $('#gender').val(); }

            $.ajax({
                url: updateUrl,
                type: 'PUT',
                data: data,
                success: function (result) {
                    LoggedInUser.setUserData(result);
                    Backbone.navigate('profile');
                },
                error: function (answer) {
                    console.log( "error: ", answer.responseText );
                }

            });
        }
    });
});
