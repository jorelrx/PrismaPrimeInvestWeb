// src/pages/funds/index.tsx
import { useEffect, useMemo, useState } from 'react';
import FundService from '../../services/FundService';
import { IApiResponse } from '@/services/interfaces';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { Fund } from '@/types/fund';
import { useRouter } from 'next/router';

const fundService = new FundService();

const FundsPage = () => {
    const [rowData, setRowData] = useState<Fund[]>([]);
    const router = useRouter();

    const handleViewDetails = (fundId: string) => {
        router.push(`/funds/details/${fundId}`);
    };
    
    // Colunas definidas com tipos esperados pelo Ag-Grid
    const [columnDefs] = useState<ColDef<Fund>[]>([
        { field: 'name', headerName: 'Nome' },
        { field: 'code', headerName: 'Código' },
        { field: 'type', headerName: 'Tipo' },
        { field: 'bestBuyDay', headerName: 'Melhor dia de compra' },
        { field: 'createdAt', headerName: 'Data criação' },
        { field: 'updatedAt', headerName: 'Última atualização'},
        {
            headerName: 'Ações',
            field: 'id',
            cellRenderer: (params) => (
                <button onClick={() => handleViewDetails(params.value)}>
                    Ver Detalhes
                </button>
            ),
            filter: false,
            sortable: false,
        },
    ]);

    // Configuração padrão para colunas
    const defaultColDef = useMemo(() => ({
        filter: true, // Aplicar filtros automáticos
        floatingFilter: true,
        sortable: true, // Ordenação de colunas
        resizable: false // Redimensionamento de colunas
    }), []);

    // Define o tipo de seleção de linha
    const rowSelection: RowSelectionOptions = {
        checkboxes: false,
        mode: "singleRow"
      };

    // const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response: IApiResponse<Fund[]> = await fundService.getAll();
                setRowData(response.response);
                // setMessage(response.message);
            } catch (error) {
                console.error("Erro ao buscar fundos:", error);
            }
        };
        fetchFunds();
    }, []);

    return (
        <>
            <button onClick={() => router.push(`/funds/create`)}>
                Ver Detalhes
            </button>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={rowSelection}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>
    );
};

export default FundsPage;
