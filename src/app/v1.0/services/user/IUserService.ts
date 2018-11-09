export interface IUserService {
    get(userId: string): any;
    login(token: string): any;
    findByEmail(email: string): any;
    create(userId: string, item: any, sendActivationEmail?: boolean): any;
}