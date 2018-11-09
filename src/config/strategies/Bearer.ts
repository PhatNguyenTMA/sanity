const moment = require("moment");
const _ = require("lodash");
import passport = require("passport");
const BearStrategy = require("passport-http-bearer");
import container from "../../app/routes/v1.0/IocConfig";
import {IUserService} from "../../app/v1.0/services/user/IUserService";
import {TokenService} from "../../app/v1.0/services/authorization/TokenService";
import {Logger} from "../../app/core/logs/Logger";
import {createAppError} from "../../app/core/Common/AppError";
import * as ERRORS from "../../app/core/Common/ErrorCode";
import {Authorization} from "../../app/core/authorization/Authorization";

export class BearerStrategies {

    static bearerStrategies() {
        let bearerStrategy = BearStrategy.Strategy;
        let iocContainer = container;
        let userService = iocContainer.get<IUserService>("IUserService"),
            tokenService = iocContainer.get<TokenService>("TokenService");

        passport.use("auth", new bearerStrategy({"passReqToCallback": true}, (req, email, done) => {
            let reqSignature = req.get("Signature");
            return userService.findByEmail(email).then((user) => {
                return user;
            }, (err) => {
                Logger.error("Find user by email failed", err);
                throw createAppError(ERRORS.AUTH.EMAIL_PASSWORD_INVALID);
            }).then((user) => {
                checkSignatureLogin(req, user.email, user.password, reqSignature);
                checkRequestTimestamp(req, user.email, null);

                let softExpiry = moment().add(_.toNumber(process.env.SOFT_EXTEND_TIME_TOKEN), "hours").toDate(),
                    hardExpiry = moment().add(_.toNumber(process.env.HARD_EXTEND_TIME_TOKEN), "days").toDate(),
                    token = {user: user._id, softExpiry: softExpiry, hardExpiry: hardExpiry};

                return tokenService.create(token);
            }).then((token) => {
                Logger.info("User logged in successfully");
                return done(null, token, {scope: "all"});
            }).catch((err) => {
                Logger.error("User login failed", err);
                return err.code ? done(null, false, err.code.toString()) : done(null, false, err);
            });
        }));


        let checkSignatureLogin = (req, email, password, reqSignature) => {
            let signature = Authorization.GenerateSignature(req, email, password);
            if (signature !== reqSignature) {
                Logger.error("Check Signature Login", "Signature Invalid");
                throw createAppError(ERRORS.AUTH.EMAIL_PASSWORD_INVALID);
            }
        };

        let checkRequestTimestamp = (req, email, token) => {
            let reqTimestamp = req.get("Timestamp");
            if (!reqTimestamp) {
                Logger.error("request is missing timestamp");
                throw createAppError(ERRORS.AUTH.REQUEST_TIMESTAMP_INVALID);
            }

            let currentTimestamp = Math.floor(Date.now() / 1000);

            if ((currentTimestamp - reqTimestamp) > _.toNumber(process.env.REQUEST_TIMEOUT)) {
                Logger.error("Request is longer than " + process.env.REQUEST_TIMEOUT + "s. Email" + email + "  Token: " + token, "Check timestamp failed");
                throw createAppError(ERRORS.AUTH.REQUEST_INVALID);
            }
        };
    }
}