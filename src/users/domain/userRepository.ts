import { promises } from "dns";
import { User } from "./user";

export interface UserRepository {
    Createuser(
        uuid: string,
        name: string,
        last_name: string,
        email: string,
        password: string,
        status: boolean
    ):Promise<User | null | Error>

    GetAllUser():Promise<User[] | null>
    
    getById(uuid:string):Promise<User | null>

    updateUserById( //listo 
        uuid: string,
        name?: string,
        last_name?: string,
        email?: string,
    ): Promise<User | null>

    deleteUser(uuid: string):Promise<string | null>;

}