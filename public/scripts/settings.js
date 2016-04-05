define(['backbone'], function (Backbone) {

    var Settings = Backbone.Model.extend({
        defaults: {
            apiKey: "d4cd9757001b363cca9dc7e1ea06439f47bb02ac",
            loginUrl:"api/sign_in",
            logOutUrl:"api/sign_out",
            signUpUrl:"api/sign_up",
            usersUrl:"api/users/",
            wallPosts:"api/wall_posts/",
            friends:"api/friends/"
        }
    });

    return new Settings();
});