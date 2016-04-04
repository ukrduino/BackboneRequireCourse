define(['underscore', 'backbone', 'settings', 'moment'], function (_, Backbone, settings, moment) {

    return Backbone.Model.extend({
        defaults: {
            'id': null,
            'record_type': null,
            'description': null,
            'image_url': null,
            'video_url': null,
            'sender_id': null,
            'receiver_id': null,
            'subject': null,
            'visibility': null,
            'created_at': null,
            'updated_at': null
        },
        dateFields: [
            'created_at',
            'updated_at'
        ],
        url: settings.get('wallPosts'),

        processDate: function (dateField) {
            if (this.get(dateField)) {
                var momentDate = moment(this.get(dateField));
                this.set(dateField, momentDate.format("DD.MM.YYYY"), {silent: true});
            }
        },
        processDates: function () {
            _.each(this.dateFields, function (dateField) {
                this.processDate(dateField)
            }, this);
        }
    })
});


