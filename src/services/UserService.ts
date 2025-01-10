import { IUser } from "@/types/user/IUser";
import { BaseService } from "./BaseService";

class UserService extends BaseService<IUser, null> {
  constructor() {
    super("/user");
  }
}

export default UserService;
