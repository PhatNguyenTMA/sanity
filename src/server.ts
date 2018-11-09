import express = require("express");

import {DataContext} from "./app/core/repositories/DataContext";
import {Logger} from "./app/core/logs/Logger";
import Configuration = require("./config/Configuration");

let startServer = () => {
    try {
        Logger.info("Start API Server in environment " + process.env.NODE_ENV);
        DataContext.connect();
        let app = express();
        let port = parseInt(process.env.NODE_PORT, 10) || 3000;
        app.set("port", port);

        app.use(Configuration.setup);

        let server = app.listen(port, () => {
            Logger.info("API Server is running on port " + port);
        });

        /*
            name            value           action
            SIGHUP          1               Hangup
            SIGINT          2               Interrupt (Ctrl + C)
            SIGKILL         9               Cancel Process
            SIGTERM         15              Terminate Process
            SIGSTOP         17, 19, 23      Stop Process
        */

        // Graceful shutdown of server
        process.on("SIGTERM", () => {
            Logger.info("API Server is shutting down");
            server.close(function () {
                process.exit(0);
            });
        });

    } catch (e) {
        Logger.error("Can't start API Server", e);
    }
};

let setupEnvironment = () => {
    process.env.NODE_ENV = "dev";
    process.env.NODE_PORT = "3000";
    process.env.DATABASE_NAME = "sanity";
    process.env.DB_CONNECTION_STRING = "localhost:27017";
    process.env.SOFT_EXTEND_TIME_TOKEN = "8";
    process.env.HARD_EXTEND_TIME_TOKEN = "3";
    process.env.REQUEST_TIMEOUT = "1000 * 60 * 60";
};
try {
    setupEnvironment();
    startServer();
} catch (e) {
    Logger.error("Can't start API Server", e);
}