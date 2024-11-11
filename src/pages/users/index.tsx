// src/pages/users/index.tsx
import { useEffect, useMemo, useState } from 'react';
import UserService from '../../services/UserService';
import { IApiResponse } from '@/services/interfaces';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { User } from '@/types/user';

const userService = new UserService();

const UsersPage = () => {
    const [rowData, setRowData] = useState<User[]>([]);
    
    // Colunas definidas com tipos esperados pelo Ag-Grid
    const [columnDefs] = useState<ColDef<User>[]>([
        { field: 'firstName', headerName: 'Nome' },
        { field: 'lastName', headerName: 'Sobrenome' },
        { field: 'document', headerName: 'Documento' },
        { field: 'createdAt', headerName: 'Criado' },
        { field: 'updatedAt', headerName: 'Atualiado'}
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
        const fetchUsers = async () => {
            try {
                const response: IApiResponse<User[]> = await userService.getAll();
                setRowData(response.response);
                // setMessage(response.message);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
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
    );
};

export default UsersPage;
