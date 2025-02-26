"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, useCallback } from "react";
import { DatePicker } from "./DatePicker";
import WalletService from "@/services/WalletService";
import FundDailyPriceService from "@/services/FundDailyPriceService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils"; 
import { useNotification } from "@/contexts/NotificationContext";

const isValidDate = (val: unknown): val is Date => val instanceof Date && !isNaN(val.getTime());
const isValidNumber = (val: unknown): val is number => typeof val === "number" && !isNaN(val);

const formSchema = z.object({
    wallet: z.string().min(1, "Selecione uma carteira"),
    date: z.any().refine(isValidDate, "Data inválida").transform((val) => new Date(val)),
    amount: z.any().refine(isValidNumber, "O valor deve ser numérico").transform((val) => Number(val)),
    quantity: z.number().min(1, "A quantidade deve ser pelo menos 1"),
});

type FormData = z.infer<typeof formSchema>;

interface AddAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    code: string;
    assetId: string;
}

interface Wallet {
    id: string;
    name: string;
}

const walletService = new WalletService();
const fundDailyPriceService = new FundDailyPriceService();

export function AddAssetModal({ isOpen, onClose, code, assetId }: AddAssetModalProps) {
    const { addNotification } = useNotification();
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [prices, setPrices] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            wallet: "",
            date: undefined,
            amount: undefined,
            quantity: undefined,
        },
    });

    const selectedWallet = watch("wallet");
    const selectedDate = watch("date");
    const selectedAmount = watch("amount");
    const selectedQuantity = watch("quantity");

    useEffect(() => {
        if (selectedAmount && selectedQuantity) {
            setTotalPrice(selectedAmount * selectedQuantity);
        } else {
            setTotalPrice(0);
        }
    }, [selectedAmount, selectedQuantity]);

    const fetchWallets = useCallback(async () => {
        try {
            const { response } = await walletService.getAll({});
            setWallets(response.items);
        } catch (error) {
            console.error("Erro ao buscar carteiras:", error);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            reset();
            fetchWallets();
        }
    }, [isOpen, fetchWallets, reset]);

    const fetchPrices = useCallback(async () => {
        if (!selectedDate) return;
        console.log("Buscando preços para a data:", selectedDate)
        try {
            const { response } = await fundDailyPriceService.getAll({ date: selectedDate, fundId: assetId });

            if (response.items.length > 0) {
                const { openPrice, closePrice } = response.items[0];
                const priceList = [];

                if (openPrice <= closePrice) {
                    for (let price = openPrice; price <= closePrice; price += 0.01) {
                        priceList.push(parseFloat(price.toFixed(2)));
                    }
                } else {
                    for (let price = openPrice; price >= closePrice; price -= 0.01) {
                        priceList.push(parseFloat(price.toFixed(2)));
                    }
                }

                setPrices(priceList);
            }
            else {
                setPrices([]);
            }
        } catch (error) {
            console.error("Erro ao buscar preços:", error);
        }
    }, [selectedDate, assetId]);

    useEffect(() => {
        fetchPrices();
    }, [selectedDate, fetchPrices]);

    const onSubmit = async (data: FormData) => {
        console.log("Dados enviados:", data);

        const result = await walletService.purchaseAsset(
            data.wallet,
            assetId,
            data.quantity,
            data.amount,
            data.date,
        );

        if (result.status === 200) {
            addNotification("success", "Cotas compradas com sucesso!")
        }
        else {
            addNotification("error", "Erro ao comprar cotas!")
        }

        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Comprar {code}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Carteira</label>
                        <Select onValueChange={(value) => setValue("wallet", value)}>
                            <SelectTrigger className={cn("w-full", errors.wallet && "border-red-500")}>
                                <SelectValue placeholder="Selecione uma carteira" />
                            </SelectTrigger>
                            <SelectContent>
                                {wallets.map((wallet) => (
                                    <SelectItem key={wallet.id} value={wallet.id}>
                                        {wallet.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.wallet && <p className="text-red-500 text-xs">{errors.wallet.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data</label>
                        <DatePicker
                            selectedDate={selectedDate}
                            onSelect={(date) => setValue("date", date)}
                            disabled={!selectedWallet}
                        />
                        {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Valor</label>
                        {prices.length === 0 ? (
                            <div className="w-full border border-gray-300/70 rounded-md p-2 flex items-center cursor-not-allowed">
                                <p className="text-gray-500/80 text-sm">Não tem nenhum preço para essa data</p>
                            </div>
                        ) : (
                            <Select onValueChange={(value) => setValue("amount", Number(value))} disabled={!selectedDate}>
                                <SelectTrigger className={cn("w-full", errors.amount && "border-red-500")}>
                                    <SelectValue placeholder="Selecione um valor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {prices.map((price) => (
                                        <SelectItem key={price} value={price.toString()}>
                                            R$ {price.toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantidade</label>
                        <Input
                            type="number"
                            placeholder="Quantidade"
                            {...register("quantity", { valueAsNumber: true })}
                            className={cn(
                                "border border-gray-300 rounded-md",
                                errors.quantity && "border-red-500"
                            )}
                            disabled={!selectedAmount || !(prices.length > 0)}
                        />
                        {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity.message}</p>}
                    </div>

                    {totalPrice > 0 && <p className="text-lg font-semibold">Total: R$ {totalPrice.toFixed(2)}</p>}

                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={!isValid}>
                            Comprar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
