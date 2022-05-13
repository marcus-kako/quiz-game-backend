import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Users;');
    const [rows] = result;
    return rows as User[];
  }

  public async getById(id: number): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Users WHERE id = ?;', [id]);
    const [rows] = result;
    return rows as User[];
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

  // public async create(book: Book): Promise<Book> {
  //   const { title, price, author, isbn } = book;
  //   const result = await this.connection.execute<ResultSetHeader>(
  //     'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
  //     [title, price, author, isbn],
  //   );
  //   const [dataInserted] = result;
  //   const { insertId } = dataInserted;
    // return { id: insertId, ...book };
  // }
}
