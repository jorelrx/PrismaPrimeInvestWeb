"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/types/user/IUser";
import UserService from "@/services/UserService";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface UserTableProps {
  initialFilters: { name: string; sort: string; page: number };
}

const userService = new UserService();

export default function UserTable({ initialFilters }: UserTableProps) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filters, setFilters] = useState(initialFilters);
    const [isLoading, setIsLoading] = useState(false);

    // Lida com alterações nos filtros
    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        setIsLoading(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await userService.getAll(filters);
                setUsers(data.response);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [filters])
    
    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "firstName",
            header: "Nome",
        },
        {
            accessorKey: "lastName",
            header: "Sobrenome",
            },
        {
            accessorKey: "email",
            header: "E-mail",
        },
    ]

    return (
        <div>
        {/* Filtros */}
        <div className="flex gap-2 mb-4">
            <input
            type="text"
            placeholder="Pesquisar por nome"
            value={filters.name}
            onChange={(e) => handleFilterChange({ name: e.target.value })}
            className="border p-2 rounded"
            />
            <select
            value={filters.sort}
            onChange={(e) => handleFilterChange({ sort: e.target.value })}
            className="border p-2 rounded"
            >
            <option value="name_asc">Nome (A-Z)</option>
            <option value="name_desc">Nome (Z-A)</option>
            </select>
        </div>

        {/* Tabela */}
        {isLoading ? (
            <div>Carregando...</div>
        ) : (
                <DataTable 
                    columns={columns}
                    data={users}
                />
        )}
        </div>
    );
}
