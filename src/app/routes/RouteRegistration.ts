let version = require("express-route-versioning");

export class RouteRegistration {
    static register(app) {
        version.use({
            header: "Accept-Version",
            grap: /([0-9]*\.?[0-9]+)/,
            error: 406
        });

        app.use((req, res, next) => {
            // Set accept-version header to the latest if not set
            if (typeof req.headers["accept-version"] === "undefined" || !req.headers["accept-version"])
                req.headers["accept-version"] = "1.0";
            next();
        }, version.reroute({
            1.0: require(__dirname + "/v1.0").register()
        }));
    }
}