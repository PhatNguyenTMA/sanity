import {RepositoryBase} from "../../../core/repositories/RepositoryBase";
let TokenSchema = require("../../../schemas/authorization/TokenSchema");

export class TokenRepository extends RepositoryBase {

    constructor() {
        super(TokenSchema);
    }
}