import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class GetAllUserUseCase {
    constructor(readonly userRepository: UserRepository){}

    async getAll ():Promise<User[] |null>{
    try {
        const listUsers= await this.userRepository.GetAllUser();
        return listUsers
    } catch (error) {
        return null;
    }}
}