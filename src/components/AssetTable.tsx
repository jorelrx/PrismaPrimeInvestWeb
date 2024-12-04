"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Fund } from "@/types/fund/Fund"

import { ArrowUpDown, ChevronLeft, ChevronRight, LogsIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// type Asset = {
//   id: string
//   ticker: string
//   price: number
//   management: string
//   dy: number
//   pvp: number
//   percentCash: number
//   numQuotaHolders: number
//   cagr3Years: number
//   avgLiquidity: number
//   equity: number
//   equityPerQuota: number
//   numQuotas: number
//   lastIncome: number
// }

const columns: ColumnDef<Fund>[] = [
    {
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <div className="flex justify-end items-center pl-4">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TICKER
                    </Button>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <div className="flex items-center pl-4">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        PREÇO
                    </Button>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return formatted;
        },
    },
    {
        accessorKey: "maxPrice",
        header: ({ column }) => {
            return (
                <div className="flex items-center pl-4">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        PREÇO MÁXIMO
                    </Button>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("maxPrice"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return formatted;
        },
    },
    {
        accessorKey: "minPrice",
        header: ({ column }) => {
            return (
                <div className="flex items-center pl-4">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        PREÇO MÍNIMO
                    </Button>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("minPrice"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return formatted;
        },
    },
    {
        accessorKey: "bestBuyDay",
        header: ({ column }) => {
            return (
                <div className="flex items-center pl-4">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Melhor dia de comprar
                    </Button>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "bestBuyDayPrice",
        header: ({ column }) => {
            return (
                <div className="flex items-center pl-4">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Melhor preço de compra
                    </Button>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("bestBuyDayPrice"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return formatted;
        },
    }
]

export default function AssetsTable({ data }: { data: Fund[] }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const router = useRouter()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
        sorting,
        columnVisibility,
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-end items-center mx-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <LogsIcon className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-muted/50 divide-x divide-gray-200">
                                {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="border-b border-gray-200 font-semibold text-blue-900">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </TableHead>
                                )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.original.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors divide-x divide-gray-200"
                                    onClick={() => router.push(`/funds/${row.original.code}`)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="border-b border-gray-200 text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))} 
                                </TableRow>
                                )
                            )
                            ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4 px-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Linhas por página</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                        table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 25, 100].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: 5 }, (_, i) => i + table.getState().pagination.pageIndex).map((pageIndex) => (
                    <Button
                        key={pageIndex}
                        variant={pageIndex === table.getState().pagination.pageIndex ? "default" : "outline"}
                        size="sm"
                        onClick={() => table.setPageIndex(pageIndex)}
                        disabled={pageIndex >= table.getPageCount()}
                    >
                        {pageIndex + 1}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                </div>
            </div>
        </div>
    )
}