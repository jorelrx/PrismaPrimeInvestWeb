import { IUser } from "../user/IUser";

export interface ILoginResponse {
    token: string;
    user: IUser;
}
