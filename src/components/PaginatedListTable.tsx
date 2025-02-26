"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface Column<T> {
    header: string
    accessorKey?: keyof T
    cell?: (item: T) => ReactNode
    sortable?: boolean
    align?: "left" | "center" | "right"
}

interface PaginationInfo {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
}

interface PaginatedTableProps<T> {
    data: T[]
    columns: Column<T>[]
    pagination: PaginationInfo
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
    getRowHref?: (item: T) => string
    pageSizeOptions?: number[]
    className?: string
}

export function PaginatedListTable<T extends { id: string | number }>({
    data,
    columns,
    pagination,
    onPageChange,
    onPageSizeChange,
    getRowHref,
    pageSizeOptions = [10, 20, 30, 50, 100],
    className,
}: PaginatedTableProps<T>) {
    const { currentPage, pageSize, totalItems, totalPages } = pagination

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage <= 3) {
                for (let i = 2; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push("...")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push("...")
                pages.push(currentPage - 1)
                pages.push(currentPage)
                pages.push(currentPage + 1)
                pages.push("...")
                pages.push(totalPages)
            }
        }

        return pages
    }

    const renderCell = (item: T, column: Column<T>) => {
        if (column.cell) {
            return column.cell(item)
        }

        if (column.accessorKey) {
            return String(item[column.accessorKey])
        }

        return null
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-gray-100">
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={`font-medium text-gray-700 ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}`}
                            >
                                {column.sortable ? (
                                    <Button
                                        variant="ghost"
                                        className={`hover:bg-gray-50 font-medium text-gray-700 ${column.align === "center" ? "mx-auto" : column.align === "right" ? "-mr-4 ml-auto" : "-ml-4"}`}
                                    >
                                        {column.header}
                                        <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
                                    </Button>
                                ) : (
                                    column.header
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => {
                        return (
                            <TableRow
                                key={item.id.toString()}
                                className="group hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex} className={`${getRowHref ? "p-0" : ""} ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}`}>
                                        {getRowHref ? (
                                            <Link href={getRowHref(item)} className={`flex h-full px-4 py-3 cursor-pointer ${column.align === "center" ? "justify-center" : column.align === "right" ? "justify-end" : "justify-start"}`}>
                                                {renderCell(item, column)}
                                            </Link>
                                        ) : (
                                            renderCell(item, column)
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between px-2 py-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>Linhas por página</span>
                        <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
                            <SelectTrigger className="w-[70px] h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {pageSizeOptions.map((size) => (
                                    <SelectItem key={size} value={size.toString()}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        Mostrando <span className="font-medium">{startItem}</span> até{" "}
                        <span className="font-medium">{endItem}</span> de <span className="font-medium">{totalItems}</span>{" "}
                        resultados
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página anterior</span>
                    </Button>

                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2">
                            ...
                        </span>
                        ) : (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPageChange(page as number)}
                            >
                                {page}
                            </Button>
                        ),
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Próxima página</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

