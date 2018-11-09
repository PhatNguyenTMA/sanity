import {LOG_CLASS_LEVEL} from "../Common/Enum";
import {transports} from "winston";
let _ = require("lodash");
let winston = require("winston");
const callsites = require("callsites");

export class Logger {
    public static LOG_LEVELS = [LOG_CLASS_LEVEL.INFO, LOG_CLASS_LEVEL.ERROR, LOG_CLASS_LEVEL.DEBUG, LOG_CLASS_LEVEL.WARNING];
    public static NOLOG = false;
    private static logProvider = new winston.Logger({
        transports: [
            new  (winston.transports.Console)({level: "info", stringify: true, colorize: true, json: true})
        ],
        exitOnError: false
    });

    static formatInfoMessage(logLevel: string, location: any, message: string, data?: any) {
        let messageData: any = {
            logLevel: logLevel,
            message: message,
            location: location,
            time: new Date().toISOString()
        };

        if (data) {
            messageData.data = JSON.stringify(data, null, 2);
        }

        return messageData;
    }

    static info(message: string, data?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.INFO) === -1) {
            return;
        }
        this.logProvider.info(this.formatInfoMessage("info", this.getLocation(callsites()), message, data));
    }

    static debug(message: string, data?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.DEBUG) === -1) {
            return;
        }
        this.logProvider.debug(this.formatInfoMessage("debug", this.getLocation(callsites()), message, data));
    }

    static warning(message: string, data?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.WARNING) === -1) {
            return;
        }
        this.logProvider.warn(this.formatInfoMessage("warn", this.getLocation(callsites()), message, data));
    }

    static formatErrorMessage(logLevel: string, location: any, message: string, errorMessage?: any) {
        let messageData: any = {
            logLevel: logLevel,
            message: message,
            location: location
        };

        if (errorMessage) {
            if (_.isPlainObject(errorMessage)) {
                messageData.error = JSON.stringify(errorMessage, null, 2);
                messageData.stackTrace = new Error().stack;
            } else if (errorMessage instanceof Error && errorMessage.message) {
                messageData.error = errorMessage.message;
                messageData.stackTrace = errorMessage.stack;
            } else {
                messageData.error = errorMessage;
                messageData.stackTrace = new Error().stack;
            }
        }
    }

    static error(message: any, error?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.ERROR) === -1) {
            return;
        }
        this.logProvider.error(this.formatErrorMessage("error", this.getLocation(callsites()), message, error));
    }

    static getLocation(ltDataTrace: any) {
        let dataTrace = ltDataTrace[1];
        let funcName = dataTrace.getFunctionName();
        if (funcName) {
            if (funcName.indexOf(".") >= 0) {
                return funcName + ":" + dataTrace.getLineNumber() + ":" + dataTrace.getColumnNumber();
            } else {
                return dataTrace.getFileName().split("\\").pop().split(".")[0] + "." + funcName + ":" + dataTrace.getLineNumber() + ":" + dataTrace.getColumnNumber();
            }
        } else {
            return dataTrace.getFileName().split("\\").pop() + ":" + dataTrace.getLineNumber() + ":" + dataTrace.getColumnNumber();
        }
    }
}