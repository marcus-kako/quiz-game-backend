import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { displayName, email, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Users (displayName, email, password) VALUES (?, ?, ?)',
      [displayName, email, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    return {
      id: insertId,
      ...user,
    }
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT id, displayName, email FROM Users;');
    const [rows] = result;
    return rows as User[];
  }

  public async getById(id: number): Promise<User[] | []> {
    const result = await this.connection
      .execute('SELECT id, displayName, email FROM Users WHERE id = ?;', [id]);
    const [rows] = result;
    return rows as User[];
  }
}
