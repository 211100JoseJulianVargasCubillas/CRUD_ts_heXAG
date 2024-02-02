import { query } from "../../database/msql";
import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class MySqlUSerRepository implements UserRepository{

     async Createuser(uuid: string, name: string, last_name: string, email: string, password: string, status: boolean): Promise<User | Error | null> {
        try {
            let sql = "INSERT INTO users(uuid, name, last_name, email, password, status) VALUES (?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, last_name, email, password, status];

            console.log('Executing SQL:', sql);
            console.log('Parameters:', params);

            const result = await query(sql, params)

            // Asegúrate de que result tenga el formato esperado antes de intentar desestructurarlo

            return new User(uuid, name, last_name, email, password, status);
        } catch (error) {
            console.error("Error adding user:", error);
            return error as Error;
        }  
    }

    
    async GetAllUser(): Promise<User[] | null> {
        try {
            const sql = "SELECT * FROM users";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }
            const users: User[] = rows.map(row => new User(row.uuid, row.name, row.last_name, row.email, row.password, row.status));
            return users
        } catch (error) {
            console.error(error);
            return null; // retornas null o podrías optar por retornar un array vacío dependiendo de tu lógica de negocio
        }
    }
    async getById(uuid: string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE uuid = ? LIMIT 1"; // SQL para obtener un usuario por uuid
            const [rows]: any = await query(sql, [uuid]); // Ejecutamos la consulta, pasando el uuid como parámetro

            if (!rows || rows.length === 0) return null; // Si no hay resultados, retornamos null        
            const row = rows[0]; // Tomamos el primer resultado (ya que uuid debería ser único)
            // Retornamos una nueva instancia de User con los datos obtenidos
            return new User(row.uuid, row.name, row.last_name, row.email, row.password,row.status);
        } catch (error) {
            console.error(error);
            return null; // En caso de error, retornamos null
        }
    }
    async updateUserById(uuid: string, name?: string, last_name?: string, email?: string): Promise<User | null> {
        
        const updates: { [key: string]: string } = {};
        if (name !== undefined) updates.name = name;
        if (last_name !== undefined) updates.last_name = last_name;
        if (email !== undefined) updates.email = email;

        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;

        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
          
            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }

            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].last_name,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].loan_status,
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }

    }
    async deleteUser(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM users WHERE uuid = ?';
            const result: any = await query(sql, [uuid]);
            if (result[0].affectedRows === 0){
                return null;
            } 

            return 'User deleted successfully.';
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
}