import connection from '../models/connection';
import UserModel from '../models/userModel';
import User from '../../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const users = await this.model.getAll();
    return users;
  }

  public async getById(id: number): Promise<User[]> {
    const users = await this.model.getById(id);
    return users;
  }

  public async create(user: User): Promise<User> {
    const createdUser = await this.model.create(user);
    return createdUser;
  }
}

export default UserService;