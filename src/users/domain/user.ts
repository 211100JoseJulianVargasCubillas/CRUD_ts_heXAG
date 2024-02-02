export class User {
    constructor(
    public uuid: string,
    public name: string,
    public last_name: string,   
    public email: string,
    public password: string,
    public status: boolean
    ){}
}
