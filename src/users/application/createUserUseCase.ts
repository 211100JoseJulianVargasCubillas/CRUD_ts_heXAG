import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";
import { v4 as uuid } from "uuid";

export class CreateUserUseCase {
    constructor(readonly userRepository: UserRepository){}
    async createUser(
        name: string,
        last_name: string,
        email: string,
        password: string,
        ):Promise<User | null | Error>{
            const generateUuid = uuid();
            const status = false
            try {
                const Crete = await this.userRepository.Createuser(generateUuid,name,last_name,email,password, status) 
                return Crete
            } catch (error) {
                return null;
            }
        }
}