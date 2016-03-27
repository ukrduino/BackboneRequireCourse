define(['backbone'], function (Backbone) {

    var Settings = Backbone.Model.extend({
        defaults: {
            apiKey: "d4cd9757001b363cca9dc7e1ea06439f47bb02ac",
            loginUrl:"http://192.168.10.169/api/sign_in",
            logOutUrl:"http://192.168.10.169/api/sign_out"
        }
    });

    return new Settings();
});