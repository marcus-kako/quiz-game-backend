import connection from '../models/connection';
import UserModel from '../models/userModel';
import IUser from '../../interfaces/IUser';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async isValidEmail(email: string): Promise<boolean> {
    const allUsers: IUser[] = await this.getAll();
    const isValid: IUser[] | [] = allUsers
    .filter((u) => u.email === email) 
    return isValid.length === 0
  }
  public async isValiddisplayName(displayName: string): Promise<boolean> {
    const allUsers: IUser[] = await this.getAll();
    const isValid: IUser[] | [] = allUsers
    .filter((u) => u.nickname === displayName) 
    return isValid.length === 0
  }

  public async create(user: IUser): Promise<IUser | void> {
    const vaEmail = await this.isValidEmail(user.email) 
    const vaDisplayName = await this.isValiddisplayName(user.nickname) 
    if (!vaEmail) {
      throw new Error('"Email" already registered');
    } else if (!vaDisplayName) {
      throw new Error('"Nickname" already exists');
    } else {
      const createdUser = await this.model.create(user);
      return createdUser;
    }
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.model.getAll();
    return users;
  }

  public async getById(id: number): Promise<IUser[]> {
    const users = await this.model.getById(id);
    return users;
  }
}

export default UserService;