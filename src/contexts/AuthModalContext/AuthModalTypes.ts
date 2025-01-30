export type AuthModalState = {
    isOpen: boolean;
    isSignIn: boolean;
};
  
export type AuthModalAction =
    | { type: "OPEN_MODAL"; isSignIn: boolean }
    | { type: "CLOSE_MODAL" };
  
export const initialState: AuthModalState = {
    isOpen: false,
    isSignIn: true,
};

export interface AuthModalContextProps {
    isOpen: boolean;
    isSignIn: boolean;
    openModal: (mode: boolean) => void;
    closeModal: () => void;
}
