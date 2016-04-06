define(['underscore', 'backbone'], function (_, Backbone) {

    var eventDispatcher = {};
    _.extend(eventDispatcher, Backbone.Events);

    return eventDispatcher;
});