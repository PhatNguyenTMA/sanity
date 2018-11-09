import express = require("express");
import {Container} from "inversify";
import {UserController} from "../../v1.0/controllers/UserController";

const router = express.Router();

export class UserRoute {
    private _container: Container;
    private _userController: UserController;

    constructor(container: Container) {
        this._container = container;
        this._userController = this._container.get<UserController>("UserController");
    }

    get routes() {
        let controller = this._userController;
        router.route("/:_id/users")
            .post(controller.create.bind(controller));

        return router;
    }
}