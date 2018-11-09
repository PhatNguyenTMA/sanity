const _ = require("lodash");
import {HTTP_STATUS_CODE} from "../Common/HttpStatusCode";
import * as ERROR_CODE from "../Common/ErrorCode";
export namespace ResponseSerializer {
    export function createItemResult(resource: string, item: Object): any {
        return {
            data: item,
            meta: {"type": resource}
        };
    }

    export function createExceptionResult(errorResourceDefault: any, errors: any): any {
        return this.createErrorResult(errorResourceDefault, errors, HTTP_STATUS_CODE.SERVER_ERROR);
    }

    export function createErrorResult(errorResourceDefault: any, errors: any, httpStatus: number = HTTP_STATUS_CODE.VALIDATION_FAILED): any {
        if (errors.httpStatus) {
            httpStatus = errors.httpStatus;
        }

        if (errors.resource) {
            if (errors.name === "AppError" && errors.code === ERROR_CODE.VALIDATION.KEY_NOT_FOUND.code) {
                errors.details = errors.message;
                errors.message = "The " + errorResourceDefault.resource + " could not be found";
            }

            return {
                errors: {
                    error: {
                        resource: errors.resource === "_" ? errorResourceDefault.resource : errors.resource,
                        field: errors.field,
                        code: errors.code,
                        message: errors.message,
                        details: errors.details
                    },
                    meta: {"type": "error"}
                },
                meta: {
                    "type": "collection",
                    httpStatus: httpStatus,
                    logRef: ""
                }
            };
        } else if (errors.name === "ValidationError") {
            let ltErrors = [];
            for (let field in errors.errors) {
                let err: any = errors.errors[field];
                ltErrors.push({
                    error: {
                        resource: errorResourceDefault.resource,
                        field: err.path,
                        code: errorResourceDefault.code,
                        message: err.message
                    },
                    meta: {"type": "error"}
                });
            }

            return {
                errors: ltErrors,
                meta: {
                    "type": "collection",
                    httpStatus: httpStatus,
                    logRef: ""
                }
            };
        } else if (errors.name === "CastError" || errors.name === "MongoError") {
            return {
                errors: {
                    error: {
                        resource: errorResourceDefault.resource,
                        code: errorResourceDefault.code,
                        message: errors.message
                    },
                    meta: {"type": "error"}
                },
                meta: {
                    "type": "collection",
                    httpStatus: httpStatus,
                    logRef: ""
                }
            };
        } else {
            if (_.isArray(errors)) {
                return {
                    errors: _.map(errors, (e) => {
                        return {error: e};
                    }),
                    meta: {
                        "type": "collection",
                        httpStatus: HTTP_STATUS_CODE.SERVER_ERROR,
                        logRef: ""
                    }
                };
            }

            return {
                errors: {
                    error: {
                        resource: errorResourceDefault.resource,
                        code: errorResourceDefault.code,
                        message: errors.message
                    },
                    meta: {"type": "error"}
                },
                meta: {
                    "type": "collection",
                    httpStatus: HTTP_STATUS_CODE.SERVER_ERROR,
                    logRef: ""
                }
            };
        }
    }
}