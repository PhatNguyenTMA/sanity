import {EMAIL_VALIDATION_REGEX} from "../../core/Common/Constant";
import {SCHEMA} from "../../core/Common/ResourceType";
import * as Mongoose from "mongoose";

class UserSchema {
    static get schema() {
        let schema: any =  new Mongoose.Schema({
            email: {
                type: String,
                match: EMAIL_VALIDATION_REGEX,
                lowercase: true,
                trim: true
            },
            password: String,
            avatar: String,
            firstName: {
                type: String,
                trim: true
            },
            lastName: {
                type: String,
                trim: true
            },
            fullName: String,
            phone: String,
            title: {
                type: String,
                enum: ["Mr", "Ms", "Mrs"]
            },
            lastLogin: {
                type: Date
            },
            modified: Date,
            status: SCHEMA.STATUS_TYPE,
            created: {
                type: Date,
                default: Date.now
            },
            createdBy: SCHEMA.CREATED_BY_TYPE
        });

        schema.pre("save", function (next) {
            let self = this;
            self.fullName = self.firstName.trim() + self.lastName.trim();
            next();
        });

        return schema;
    }
}

export = Mongoose.model("users", UserSchema.schema, "uses");