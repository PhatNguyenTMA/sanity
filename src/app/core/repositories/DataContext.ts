import Mongoose = require("mongoose");
let Q = require("q");
import {Logger} from "../logs/Logger";

const MAX_RETRY_TIMES = 90;

export class DataContext {
    static mongooseInstance: any;
    static mongooseConnection = Mongoose.Connection;

    constructor() {
        DataContext.connect();
    }

    static connect() {
        let databaseName = process.env.DATABASE_NAME;
        if (!databaseName) {
            databaseName = "sanity";
        }
        let connectionString = "mongodb://" + process.env.DB_CONNECTION_STRING + "/" + databaseName;

        Logger.info("Start connecting to database " + connectionString);

        Mongoose.Promise = Q.Promise;

        let connect = () => {
            let connectOptions = {
                autoReconnect: true,
                reconnectTries: MAX_RETRY_TIMES,
                connectTimeoutMS: 10000 // Give up initial connection after 10 seconds
            };
            return Mongoose.connect(connectionString, connectOptions, (err) => {
                if (err) {
                    Logger.error("Can't connect to database", err);
                }
            });
        };

        connect();

        this.mongooseInstance = Mongoose;
        // get connect default
        this.mongooseConnection = Mongoose.connection;

        this.mongooseConnection.on("connected", () => {
            Logger.info("Connect to database successfully");
        });

        this.mongooseConnection.on("error", (err) => {
            Logger.error("Error when connecting to database", err);
        });

        this.mongooseConnection.on("disconnected", () => {
            Logger.error("Database connection disconnected");
            Logger.info("Database try with reconnect, in progress at the moment, retrying...");
            connect();
        });
    }
}
