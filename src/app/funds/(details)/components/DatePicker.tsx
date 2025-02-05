"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./DialogOverlayOff";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; 

interface DatePickerProps {
    selectedDate: Date | undefined;
    onSelect: (date: Date) => void;
    disabled?: boolean;
}

export function DatePicker({ selectedDate, onSelect, disabled }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400"
                onClick={() => setIsOpen(true)}
                disabled={disabled}
            >
                {
                    selectedDate
                        ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                        : "Selecione a data"
                }
                <CalendarIcon className="ml-auto h-4 w-4 text-gray-500" />
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-sm bg-white shadow-lg border border-gray-300">
                    <DialogHeader>
                        <VisuallyHidden>
                            <DialogTitle>Selecione a data</DialogTitle>
                        </VisuallyHidden>
                    </DialogHeader>
                    <ShadCalendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            if (date) {
                                onSelect(date);
                                setIsOpen(false);
                            }
                        }}
                        fromYear={1900}
                        toYear={new Date().getFullYear() + 5}
                        disabled={{ after: new Date() }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
