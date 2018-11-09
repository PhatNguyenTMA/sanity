import express = require("express");
import container from "./v1.0/IocConfig";
import {UserRoute} from "./v1.0/UserRoute";

export class V1RouteRegistration {
    static register() {
        global["IocContainer"] = container;
        let iocContainer =  global["IocContainer"];

        let router = express().Router();

        router.use("users/", new UserRoute(iocContainer).routes);

        return router;
    }
}