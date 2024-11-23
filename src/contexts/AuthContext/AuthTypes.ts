import { IUser } from "@/types/user/IUser";

export interface AuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}
  
export type AuthAction =
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: IUser }
    | { type: "LOGIN_FAILURE"; payload: string }
    | { type: "LOGOUT" }
    | { type: "LOAD_USER_SUCCESS"; payload: IUser }
    | { type: "LOAD_USER_FAILURE" };
  
export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export interface AuthContextProps {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
