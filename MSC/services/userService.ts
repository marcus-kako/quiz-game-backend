import connection from '../models/connection';
import UserModel from '../models/userModel';
import User from '../../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async isValidEmail(email: string): Promise<boolean> {
    const allUsers: User[] = await this.getAll();
    const isValid: User[] | [] = allUsers
    .filter((u) => u.email === email) 
    return isValid.length === 0
  }
  public async isValiddisplayName(displayName: string): Promise<boolean> {
    const allUsers: User[] = await this.getAll();
    const isValid: User[] | [] = allUsers
    .filter((u) => u.displayName === displayName) 
    return isValid.length === 0
  }

  public async create(user: User): Promise<User | void> {
    const vaEmail = await this.isValidEmail(user.email) 
    const vaDisplayName = await this.isValiddisplayName(user.displayName) 
    if (!vaEmail) {
      throw new Error('"Email" already registered');
    } else if (!vaDisplayName) {
      throw new Error('"displayName" already exists');
    } else {
      const createdUser = await this.model.create(user);
      return createdUser;
    }
  }

  public async getAll(): Promise<User[]> {
    const users = await this.model.getAll();
    return users;
  }

  public async getById(id: number): Promise<User[]> {
    const users = await this.model.getById(id);
    return users;
  }
}

export default UserService;