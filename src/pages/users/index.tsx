// src/pages/users/index.tsx
import { useEffect, useMemo, useState } from 'react';
import UserService from '../../services/UserService';
import { IApiResponse } from '@/services/interfaces';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { User } from '@/types/user';
import { useNotification } from '@/contexts/NotificationContext';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

const userService = new UserService();

const UsersPage = () => {
    const { addNotification } = useNotification();
    const router = useRouter();
    const [rowData, setRowData] = useState<User[]>([]);

    const [columnDefs] = useState<ColDef<User>[]>([
        { field: 'firstName', headerName: 'Nome' },
        { field: 'lastName', headerName: 'Sobrenome' },
        { field: 'document', headerName: 'Documento' },
        { field: 'createdAt', headerName: 'Criado' },
        { field: 'updatedAt', headerName: 'Atualizado' }
    ]);

    const defaultColDef = useMemo(() => ({
        filter: true,
        floatingFilter: true,
        sortable: true,
        resizable: false
    }), []);

    const rowSelection: RowSelectionOptions = {
        checkboxes: false,
        mode: "singleRow"
    };

    useEffect(() => {
        // Verificar se a URL contém a query de notificação
        if (router.query.message) {
            addNotification(router.query.message as string, 'error');
        }

        const fetchUsers = async () => {
            try {
                const result: IApiResponse<User[]> = await userService.getAll();
                if (result.status === 200) {
                    setRowData(result.response);
                    addNotification('Operação realizada com sucesso!', 'success');
                } else {
                    addNotification(result.message, 'error');
                }
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                addNotification('Erro ao buscar dados de usuários.', 'error');
            }
        };

        fetchUsers();
    }, [addNotification, router.query.message]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.authToken;

    if (!token) {
        nookies.set(context, 'notificationMessage', 'Faça login para acessar a página selecionada.', { path: '/' })

        return {
            redirect: {
                destination: `/login?redirectTo=${encodeURIComponent(context.resolvedUrl)}`,
                permanent: false,
            },
            props: {},
        };
    }

    return { props: {} };
};

export default UsersPage;
