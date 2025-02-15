"use client";

interface HeaderDetailsProps {
    name?: string;
    description?: string;
}

export function HeaderDetails({ name, description }: HeaderDetailsProps) {

    return (
        <div className="sticky top-0 z-50 w-full px-32 border-b bg-blue-800">
            <div className="h-[80px] flex items-center justify-between p-4 text-blue-50">
                <div>
                    <h1 className="text-xl font-bold">{name ?? "Carregando..."}</h1>
                    <p className="text-sm text-gray-400">{description ?? ""}</p>
                </div>
            </div>
        </div>
    );
}
