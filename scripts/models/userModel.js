define(['backbone'], function (Backbone) {

    return Backbone.Model.extend({
            defaults: {
                'first_name': "",
                'last_name': "",
                'email': "",
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
            }
        }
    )
});

