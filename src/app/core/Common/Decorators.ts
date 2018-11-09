import {ResponseSerializer} from "../utils/ResponseSerializer";
import {HTTP_STATUS_CODE} from "./HttpStatusCode";

export namespace Decorators {
    function sendResponse(logLevel: string, status: any, dataResponse, req, res) {
        if (req.method === "GET") {
            res.header("Cache-Control", "no-cache");
        }
        res.status(status).json(dataResponse);
    }

    export function itemResult(resource: string, invalidError: any, exceptionError: any) {
        return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
            let method = descriptor.value;
            descriptor.value = function (...params) {
                try {
                    var req = params[0];
                    var res = params[1];
                    method.apply(this, params)
                        .then((result) => {
                            res.json(ResponseSerializer.createItemResult(resource, result));
                            sendResponse("info", HTTP_STATUS_CODE.OK, ResponseSerializer.createItemResult(resource, result), req, res);
                        }, (err) => {
                            let rsError = ResponseSerializer.createErrorResult(invalidError, err);
                            sendResponse("error", rsError.meta.httpStatus, rsError, req, res);
                        });

                } catch (err) {
                    let rsError = ResponseSerializer.createExceptionResult(exceptionError, err);
                    sendResponse("error", rsError.meta.httpStatus, rsError, req, res);
                }
            };
        };
    }
}