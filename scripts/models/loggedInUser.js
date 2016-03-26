define(['userModel'],
    function (UserModel) {
        var loggedInUser = new UserModel();
        return loggedInUser;
    }
);
