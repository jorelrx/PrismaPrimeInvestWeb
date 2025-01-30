import { IUser, IUserCreate } from "@/types/user/IUser";
import { BaseService } from "./BaseService";

class UserService extends BaseService<IUser, IUserCreate> {
  constructor() {
    super("/user");
  }
}

export default UserService;
