import mongoose from "mongoose";

export interface TokenModel extends mongoose.Document {
    token: string;
    softExpiry: Date;
    hardExpiry: Date;
    user: string;
    created: Date;
}