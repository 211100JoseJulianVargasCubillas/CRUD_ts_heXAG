import { MySqlUSerRepository } from "./mySqlUserRepository";
import { CreateUserUseCase } from "../application/createUserUseCase";
import { CreateUserController } from "./Controllers/createUserController";
import { GetAllUserUseCase } from "../application/getAllUserUseCase"; 
import { GetAllUsersController } from "./Controllers/getAllUsersController";
import { GetByIdUseCase } from "../application/getByIdUseCase";
import { GetByIdCoontroller } from "./Controllers/getByIdController";
import { UpdateUserByIdUseCase } from "../application/updateUserByIdUseCase";
import { UpdateUserByIdController } from "./Controllers/updateUserByIdController";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./Controllers/deleteUserController";

export const mySqlUSerRepository = new MySqlUSerRepository()

export const createUserUseCase = new CreateUserUseCase(mySqlUSerRepository)
export const createUserController = new CreateUserController ( createUserUseCase)

export const getAllUsersUseCase = new GetAllUserUseCase(mySqlUSerRepository);
export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export const getByIdUseCase = new GetByIdUseCase(mySqlUSerRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);

export const updateUserByIdUseCase = new UpdateUserByIdUseCase(mySqlUSerRepository);
export const updateUserByIdController = new UpdateUserByIdController (updateUserByIdUseCase);

export const deleteUserUseCase = new DeleteUserUseCase(mySqlUSerRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);