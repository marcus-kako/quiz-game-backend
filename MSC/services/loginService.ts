import ILogin from "../../interfaces/ILogin";
import connection from '../models/connection';
import LoginModel from '../models/loginModel';

class UserService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async getLogin(login: ILogin): Promise<boolean> {
    const { email, password } = login;
    const validLogin = await this.model.getByEmail(email);
    if (validLogin.length === 0 || validLogin[0].password !== password) {
      throw new Error(
        `Invalid email or password, enter existing email and password and try again or create a new account`
        );
    }
    return true;
  }
}

export default UserService;