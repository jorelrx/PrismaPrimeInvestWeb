import { Heart, Plus } from "lucide-react";

interface HeaderDetailsProps {
    code: string;
    name: string;
}

export function HeaderDetails({ code, name } : HeaderDetailsProps ) {
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-blue-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4 text-blue-50">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-2">
                            <div className="w-8 h-8 bg-blue-900" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{code}</h1>
                            <p className="text-sm text-gray-400">{name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="rounded-full p-2 hover:bg-gray-700">
                            <Heart className="h-5 w-5" />
                        </button>
                        <button className="rounded-full p-2 hover:bg-gray-700">
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}