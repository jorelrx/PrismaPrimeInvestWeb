"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FundFavoriteService from "@/services/FundFavoriteService";
import { Heart, Plus } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
import { AddAssetModal } from "./AddAssetModal";

interface HeaderDetailsProps {
    assetId: string;
    code: string;
    name: string;
}

const fundFavoriteService = new FundFavoriteService();

export function HeaderDetails({ assetId, code, name }: HeaderDetailsProps) {
    const { addNotification } = useNotification();
    const { user } = useAuth();
    const [idFavorite, setIdFavorite] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            (async () => {
                const { response } = await fundFavoriteService.getAll({ code });
                setIdFavorite(response.items.length > 0 ? response.items[0].id : null);
            })();
        }
    }, [user, code]);

    const handleFavorite = async () => {
        if (!idFavorite) {
            const { response: respondeId } = await fundFavoriteService.create({ code });
            addNotification("success", "Fundo adicionado aos favoritos");
            setIdFavorite(respondeId);
        } else {
            await fundFavoriteService.delete(idFavorite);
            addNotification("success", "Fundo removido dos favoritos");
            setIdFavorite(null);
        }
    };

    return (
        <>
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
                            {user ? (
                                <>
                                    <button
                                        onClick={handleFavorite}
                                        className={`rounded-full p-2 transition ${
                                            idFavorite !== null ? "bg-red-600 text-white" : "hover:bg-gray-700"
                                        }`}
                                    >
                                        <Heart className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="rounded-full p-2 hover:bg-gray-700"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                <p>Faça login para favoritar ou simular uma compra</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AddAssetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                code={code}
                assetId={assetId}
            />
        </>
    );
}
