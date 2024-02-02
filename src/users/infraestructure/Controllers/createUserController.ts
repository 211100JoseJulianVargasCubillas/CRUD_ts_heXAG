import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/createUserUseCase";
import { User } from "../../domain/user";

export class CreateUserController {
    constructor (readonly createUserUseCase: CreateUserUseCase){}

    async userController(req:Request, res:Response){
        try {
            let{name, last_name, email, password} = req.body

            const createU= await this.createUserUseCase.createUser(name,last_name,email,password)

            if (createU instanceof User) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: createU.uuid,
                        name: createU.name,
                        email: createU.email,
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the user."
                });
            }
        } catch (error) {
            return null ;
        }
    }
}