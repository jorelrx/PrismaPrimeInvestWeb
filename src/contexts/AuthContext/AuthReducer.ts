import { AuthState, AuthAction } from "./AuthTypes";

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN_START":
            return { ...state, loading: true, error: null };
        case "LOGIN_SUCCESS":
            return { ...state, user: action.payload, loading: false };
        case "LOGIN_FAILURE":
            return { ...state, error: action.payload, loading: false };
        case "LOGOUT":
            return { ...state, user: null, loading: false, error: null };
        case "LOAD_USER_SUCCESS":
            return { ...state, user: action.payload, loading: false };
        case "LOAD_USER_FAILURE":
            return { ...state, user: null, loading: false, error: null };
        default:
            return state;
    }
}
