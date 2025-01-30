import { AuthModalState, AuthModalAction } from "./AuthModalTypes";

export function authModalReducer(state: AuthModalState, action: AuthModalAction): AuthModalState {
    switch (action.type) {
        case "OPEN_MODAL":
            return { isOpen: true, isSignIn: action.isSignIn };
        case "CLOSE_MODAL":
            return { isOpen: false, isSignIn: true };
        default:
            return state;
    }
}