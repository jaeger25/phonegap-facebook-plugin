CDV = (typeof CDV == "undefined" ? {} : CDV);
var cordova = window.cordova || window.Cordova;
CDV.FB = {
    _emptyFn: function() {},
    init: function (apiKey, fail) {
        Parse.FacebookUtils.init({
            appId: apiKey,
            logging: false,
            status: false,
            cookie: true,
            oauth: true
        });

        cordova.exec(this._emptyFn, (fail ? fail : null), "org.apache.cordova.facebook.Connect", "init", [apiKey]);
    },
    login: function (params, cb, fail) {
        params = params || { scope: "" };
        cordova.exec(function (e) { // login
            if (e.authResponse && e.authResponse.expiresIn) {
                Parse.FacebookUtils.logIn({
                    id: e.authResponse.userId,
                    access_token: e.authResponse.accessToken,
                    expiration_date: e.authResponse.expirationDate
                }).then(
                    function (user) {
                        if (cb) cb(user);
                    },
                    function (error) {
                        if (fail) fail(error.message);
                    });
            }
            else {
                if (cb) cb(null);
            }
        }, (fail ? fail : null), "org.apache.cordova.facebook.Connect", "login", params.scope.split(","));
    },
    logout: function (cb, fail) {
        cordova.exec(function (e) {
            Parse.User.logOut();
            if (cb) cb(e);
        }, (fail ? fail : null), "org.apache.cordova.facebook.Connect", "logout", []);
    },
    getLoginStatus: function (cb, fail) {
        cordova.exec(function (e) {
            if (cb) cb(e);
        }, (fail ? fail : null), "org.apache.cordova.facebook.Connect", "getLoginStatus", []);
    },
    dialog: function (params, cb, fail) {
        cordova.exec(function (e) { // login
            if (cb) cb(e);
        }, (fail ? fail : null), "org.apache.cordova.facebook.Connect", "showDialog", [params]);
    }
};
