import FundService from "@/services/FundService";
import AssetTable from "@/components/AssetTable";

export default async function Funds() {
    const fundService = new FundService();

    const filters = {
        date: "2024-11-21",
    };
    
    
    const data = await fundService.getAll(filters);

    return (
      <div className="w-[70vw] m-auto my-8">
        <div className="flex flex-col gap-3 m-auto px-8 py-4 rounded-md bg-white">
            <h1 className="text-xl">Buscar por assets</h1>
            <AssetTable 
                data={data.response}
            />
        </div>
      </div>
    );
}
