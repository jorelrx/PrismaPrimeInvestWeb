import { IUser } from "@/types/user/IUser";
import { BaseService } from "./BaseService";

class UserService extends BaseService<IUser> {
  constructor() {
    super("/user");
  }
}

export default UserService;
