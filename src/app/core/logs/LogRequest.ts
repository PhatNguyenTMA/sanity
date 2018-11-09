let winston = require("winston");
let _ = require("lodash");
import {LOG_CLASS_LEVEL} from "../common/Enum";
import {Logger} from "./Logger";

export class LogRequest {
    private static logProvider = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({level: "silly", colorize: false, stringify: true, json: true})
        ],
        exitOnError: false
    });

    static logConsole = (req, res, next) => {
        Logger.info("Request received");

        res.on("finish", function () {
            if (req.originalUrl === "/") {
                return;
            }

            if ("OPTIONS" !== req.method) {
                let requestDO: any = {
                    log_level: LOG_CLASS_LEVEL.INFO,
                    method: req.method, // http request method
                    endpoint: req.originalUrl, // endpoint requested
                    version: req.headers["accept-version"], // api version used
                    response_code: res.statusCode, // http response code returned
                    body: req.body, // request body received by the service
                    log_time: new Date().toISOString()
                };
                LogRequest.logProvider.info(requestDO);
            }
        });
        next();
    }
}