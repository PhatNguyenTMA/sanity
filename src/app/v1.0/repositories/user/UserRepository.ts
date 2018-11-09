import {RepositoryBase} from "../../../core/repositories/RepositoryBase";
let UserSchema = require("../../../schemas/user/UserSchema");
export class UserRepository extends RepositoryBase {
    constructor() {
        super(UserSchema);
    }
}