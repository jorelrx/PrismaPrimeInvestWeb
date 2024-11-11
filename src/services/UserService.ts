import { User } from "@/types/user";
import { ApiService } from "./ApiService";

class UserService extends ApiService<User> {
  constructor() {
    super('/user');
  }
}

export default UserService;
