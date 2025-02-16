"use client";

import Link from "next/link";

export default function Wallets() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-[70vw] m-auto my-8 bg-white rounded-md">
                <div className="flex justify-between p-4">
                    <h1 className="text-xl">Suas carteiras.</h1>
                    <Link href="/wallet/testasd">
                        <p className="ml-4">Nova carteira</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
