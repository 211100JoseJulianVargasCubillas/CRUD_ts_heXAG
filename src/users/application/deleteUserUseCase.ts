import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";


export class DeleteUserUseCase{

    constructor(readonly userRepository: UserRepository){}

    async deleteUser(uuid:string):Promise<string | null>{

        try {
            const user = await this.userRepository.deleteUser(uuid);
            return user;
        } catch (error) {
            return null
        }
    }
}