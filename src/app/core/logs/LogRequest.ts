let winston = require("winston");
let _ = require("lodash");
import {LOG_CLASS_LEVEL} from "../common/Enum";
import {Logger} from "./Logger";

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        info: 4
    },
    colors: {
        error: "red",
        debug: "blue",
        warn: "yellow",
        info: "cyan"
    }
};

winston.addColors(config.colors);

let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.printf(
        (info: any) => {
            return `API \t | logLevel: ${info.level}, message: ${info.message}, location: ${info.location}, time: ${info.time}`;
        }
    )
);

export class LogRequest {
    private static logProvider = winston.createLogger({
        levels: config.levels,
        transports: [
            new (winston.transports.Console)({
                format: alignColorsAndTime
            })
        ]
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