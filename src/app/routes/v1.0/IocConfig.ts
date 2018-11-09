import {Container} from "inversify";
import {TokenRepository} from "../../v1.0/repositories/authorization/TokenRepository";
import {TokenService} from "../../v1.0/services/authorization/TokenService";
import {UserRepository} from "../../v1.0/repositories/user/UserRepository";
import {IUserService} from "../../v1.0/services/user/IUserService";
import {UserService} from "../../v1.0/services/user/UserService";

class IocConfig {
    static init() {
        let container = new Container();

        // Register Repository
        container.bind<TokenRepository>("TokenRepository").to(TokenRepository);
        container.bind<UserRepository>("UserRepository").to(UserRepository);

        // Register Service
        container.bind<TokenService>("TokenService").to(TokenService);
        container.bind<IUserService>("IUserService").to(UserService);


        // Register Controller
        return container;
    }
}

export default IocConfig.init();