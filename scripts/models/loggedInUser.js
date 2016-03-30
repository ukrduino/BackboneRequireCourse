define(['userModel'],
    function (UserModel) {
        var loggedInUser = UserModel.extend({
            setUserData: function (responseJson) {
                if (typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("loggedInUser", JSON.stringify(responseJson));
                } else {
                    console.log('Sorry! No Web Storage support..');
                }
                this.set(responseJson);
            }
        });
        return new loggedInUser();
    }
);
