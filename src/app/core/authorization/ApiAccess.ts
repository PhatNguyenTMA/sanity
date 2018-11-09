import passport = require("passport");

export class ApiAccess {

    static setup(app) {
        let auth = passport.authenticate("auth", {session: true});


        app.post("users/login", (req, res, next) => {
            auth(req, res, next);
            req.isBypass = true;
        });
    }


}