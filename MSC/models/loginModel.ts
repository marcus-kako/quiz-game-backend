import { Pool } from 'mysql2/promise';
import IUser from '../../interfaces/IUser';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByEmail(email: string): Promise<IUser[] | []> {
    const [result] = await this.connection
      .execute('SELECT * FROM Users WHERE email = ?;', [email]);
    const rows = result;
    return rows as unknown as IUser[];
  }
}
