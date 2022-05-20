import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../../interfaces/IUser';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: IUser): Promise<IUser> {
    const { nickname, email, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Users (nickname, email, password) VALUES (?, ?, ?)',
      [nickname, email, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    return {
      id: insertId,
      ...user,
    }
  }

  public async getAll(): Promise<IUser[]> {
    const result = await this.connection
      .execute('SELECT id, nickname, email FROM Users;');
    const [rows] = result;
    return rows as IUser[];
  }

  public async getById(id: number): Promise<IUser[] | []> {
    const result = await this.connection
      .execute('SELECT id, nickname, email FROM Users WHERE id = ?;', [id]);
    const [rows] = result;
    return rows as IUser[];
  }
}
