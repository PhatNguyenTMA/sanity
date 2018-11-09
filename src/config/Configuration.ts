import passport = require("passport");
let express = require("express");
const _ = require("lodash");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let compression = require("compression");
import {PassportConfiguration} from "./PassportConfiguration";
import {Logger} from "../app/core/logs/Logger";
import {RouteRegistration} from "../app/routes/RouteRegistration";
import {ApiAccess} from "../app/core/authorization/ApiAccess";
import {LogRequest} from "../app/core/logs/LogRequest";

class Configuration {

    static setupLoging(app) {
        Logger.info("Start setup logging");
        app.use(LogRequest.logConsole);
        Logger.info("setup logging successfully");
    }

    static setupRouting(app) {
        Logger.info("Start setup Routing");
        RouteRegistration.register(app);
        Logger.info("Setup Routing Successfully");
    }

    static setupCORS(app) {
        Logger.info("Start setup CORS");
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Nonce, Signature, Timestamp, No-Cache, Client-Request");
            res.header("Access-Control-Allow-Methods", "GET, HEAD, PUT, POST, DELETE");
            res.header("Access-Control-Expose-Headers", "WWW-Authenticate, Content-disposition");
            res.header("Access-Control-Max-Age", 172800);
            if ("OPTIONS" === req.method) {
                res.status(200).end();
            } else {
                next();
            }
        });
        Logger.info("Setup CORS successfully");
    }

    static formatQueryKeys(app) {
        Logger.info("Start format query keys to lowerCase");
        app.get("*", (req, res, next) => {
            if (!_.isEmpty(req.query)) {
                req.query = _.mapKeys(req.query, (value, key) => {
                    let keyLowerCase = key.toLowerCase();
                    return (keyLowerCase === "soryby" || keyLowerCase === "page" || keyLowerCase === "pagesize")
                        ? keyLowerCase : key;
                });
            }
            next();
        });
    }

    static setupExpress(app) {
        Logger.info("Start setup Express");
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json({
            limit: "10mb"
        }));
        app.use(compression());
        app.use(cookieParser());

        Logger.info("Setup Express successfully");
    }

    static setupAuthentication(app) {
        // Register passport
        Logger.info("Start setup authentication");
        app.use(passport.initialize());
        PassportConfiguration.register();
        Logger.info("setup authentication successfully");
    }

    static setupApiAccess(app) {
        ApiAccess.setup(app);
    }

    static get setup() {
        let app = express();
        try {
            Configuration.setupExpress(app);
            Configuration.setupCORS(app);
            Configuration.setupAuthentication(app);
            Configuration.setupApiAccess(app);
            Configuration.setupRouting(app);
            Configuration.formatQueryKeys(app);
            Configuration.setupLoging(app);
            return app;
        } catch (e) {
            Logger.error("Can not setup configuration - Failed", e);
            throw e;
        }
    }

}

Object.seal(Configuration);
export = Configuration;