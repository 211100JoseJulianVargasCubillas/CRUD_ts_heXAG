import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";



export class GetByIdUseCase{
    constructor(readonly userRepository:UserRepository ){}

    async getId(uuid:string):Promise<User | null>{
        try {
            const getUserById = await this.userRepository.getById(uuid);
            return getUserById;
        } catch (error) {
            return null
        }
    }
}