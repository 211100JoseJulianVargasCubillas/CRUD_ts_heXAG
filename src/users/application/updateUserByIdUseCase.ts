import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class UpdateUserByIdUseCase{
    constructor(readonly userRepository:UserRepository){}

    async update(
        uuid: string,
        name?: string,
        last_name?: string,
        email?: string,
        ): Promise<User | null> {

        
        try {
            const updateUserById = await this.userRepository.updateUserById(uuid,name,last_name,email);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}