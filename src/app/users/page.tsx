import UserTable from "./UserTable";

export default function UsersPage() {
    // Define os filtros iniciais
    const initialFilters = { name: "", sort: "name_asc", page: 1 };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Listagem de Usuários</h1>
            {/* Passa os dados iniciais e filtros ao UserTable */}
            <UserTable initialFilters={initialFilters} />
        </div>
    );
}
