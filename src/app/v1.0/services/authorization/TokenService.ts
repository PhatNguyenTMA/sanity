import "reflect-metadata";
import {inject, injectable} from "inversify";
import {TokenRepository} from "../../repositories/authorization/TokenRepository";

@injectable()
export class TokenService {
    constructor(@inject("TokenRepository") private _tokenRepository: TokenRepository) {

    }

    create(item: any): any {
        return this._tokenRepository.create(item);
    }

    delete(_id: string): void {
        return this._tokenRepository.deleteById(_id);
    }
}