define(['underscore', 'backbone', 'moment'], function (_, Backbone, moment) {

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
            idAttribute: 'id',

            processDate: function (dateField) {
                if (this.get(dateField)) {
                    var momentDate = moment(this.get(dateField));
                    this.set(dateField, momentDate.format("DD.MM.YYYY"), {silent: true});
                }
            },
            initialize: function () {
                this.on('change', function () {
                    _.each(this.dateFields, function (dateField) {
                        this.processDate(dateField)
                    }, this);
                });
            }
        }
    )
});

