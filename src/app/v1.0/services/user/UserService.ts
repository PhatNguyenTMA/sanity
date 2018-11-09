const _ = require("lodash");
import {inject, injectable} from "inversify";
import {IUserService} from "./IUserService";
import {UserRepository} from "../../repositories/user/UserRepository";
import {USER} from "../../../core/Common/FieldName";
import {STATUS} from "../../../core/Common/ResourceType";
import {Logger} from "../../../core/logs/Logger";
import {createAppError} from "../../../core/Common/AppError";
import * as ERRORS from "../../../core/Common/ErrorCode";

@injectable()
export class UserService implements IUserService {
    constructor(@inject("UserRepository") private _userRepository: UserRepository) {

    }

    get(userId: string): any {
        let selectFields = [USER.ID, USER.EMAIL, USER.FIRST_NAME, USER.LAST_NAME];
        return this._userRepository.findById(userId, selectFields);
    }

    login(token: any): any {
        let userId = token.user.toString(), result: any;
        return this._userRepository.findById(userId)
            .then((user) => {
                result = user;
                return this.setLastLogin(userId);
            }).then(() => {
                return result;
            });
    }

    findByEmail(email: string): any {
        return this._userRepository.findOne({email: email});
    }

    /**
     * Set last login date
     * @param userId
     */
    private setLastLogin(userId: string) {
        let updateObj = {lastLogin: Date.now()};
        return this._userRepository.updateById(userId, updateObj);
    }

    create(userId: string, item: any, sendActivationEmail?: boolean): any {
        item.email = _.toLower(item.email);
        item.createdBy = userId;
        return this.findByEmail(item.email).then((user) => {
            if (user) {
                Logger.info("User is existed");
                throw createAppError(ERRORS.VALIDATION.USER_EXIST);
            }
            return this._userRepository.create(item);
        });
    }

    private disableUser(userId: string) {
        return this._userRepository.findById(userId).then((user) => {
            user.status = STATUS.DISABLED;
            return this._userRepository.updateById(userId, user);
        });
    }
}