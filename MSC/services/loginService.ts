import ILogin from "../../interfaces/ILogin";
import IUser from "../../interfaces/IUser";
import connection from '../models/connection';
import LoginModel from '../models/loginModel';

class UserService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async getLogin(login: ILogin): Promise<IUser> {
    const { email, password } = login;
    const validLogin = await this.model.getByEmail(email);
    if (validLogin.length === 0 || validLogin[0].password !== password) {
      throw new Error(
        `Invalid email or password`
        );
    }
    return validLogin[0];
  }
}

export default UserService;