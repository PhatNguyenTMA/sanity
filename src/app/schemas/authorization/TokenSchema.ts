let uuid = require("uuid/v1");
import * as Mongoose from "mongoose";

class TokenSchema {
    static get schema() {
        let schema: any = Mongoose.Schema({
            token: String,
            softExpiry: {
                type: Date
            },
            hardExpiry: {
                type: Date
            },
            user: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true
            },
            created: {
                type: Date,
                default: Date.now
            }
        });

        schema.pre("save", function (next) {
            let self = this;
            if (!self.token || self.token === "") {
                self.token = uuid();
            }
            next();
        });

        return schema;
    }
}

export = Mongoose.model("tokens", TokenSchema.schema, "tokens");