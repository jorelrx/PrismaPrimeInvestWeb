"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import SignInForm from "./SignInForm"
import CenterInfo from "./CenterInfo"
import SignUpForm from "./signUpForm/SignUpForm"

import { useAuthModal } from "@/contexts/AuthModalContext"

export function AuthModal() {
    const { isOpen, isSignIn, closeModal, openModal } = useAuthModal();

    return (
        <>
            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
                    <DialogTitle className="sr-only">{isSignIn ? "Sign In" : "Sign Up"}</DialogTitle>
                    <div className="flex h-[600px] relative">
                        <div className="flex w-full">
                            <div
                                className={`w-1/2 transition-transform duration-500 ease-in-out transform ${isSignIn ? "translate-x-0" : "-translate-x-full"}`}
                            >
                                <SignInForm />
                            </div>
                            <div
                                className={`w-1/2 absolute inset-y-0 transition-transform duration-500 ease-in-out transform ${isSignIn ? "translate-x-full" : "translate-x-0"}`}
                            >
                                <CenterInfo />
                            </div>
                            <div
                                className={`w-1/2 absolute right-0 transition-transform duration-500 ease-in-out transform ${isSignIn ? "translate-x-full" : "translate-x-0"}`}
                            >
                                <SignUpForm onToggle={() => openModal(true)} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

