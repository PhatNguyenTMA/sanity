import express = require("express");
import {inject, injectable} from "inversify";
import {UserService} from "../services/user/UserService";
import {Decorators} from "../../core/Common/Decorators";
import itemResult = Decorators.itemResult;
import {RESOURCES} from "../../core/Common/ResourceType";
import * as ERRORS from "../../core/Common/ErrorCode";

@injectable()
export class UserController {
    constructor(@inject("IUserService") private _userService: UserService) {

    }

    login(req: express.Request, res: express.Response): void {
        return this._userService.login(req.user);
    }

    @itemResult(RESOURCES.USER, ERRORS.USER.DATA_INVALID, ERRORS.USER.EXCEPTION)
    create(req: express.Request, res: express.Response): any {
        return this._userService.create(req.user.user.toString(), req.body.data);
    }

}