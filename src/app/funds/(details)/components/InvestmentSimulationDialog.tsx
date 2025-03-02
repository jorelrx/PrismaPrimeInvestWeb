import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
interface InvestmentSimulationDialogProps {
  asset: {
    name: string;
    price: number;
    dividendYield: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const InvestmentSimulationDialog = ({ 
  asset, 
  open, 
  onOpenChange 
}: InvestmentSimulationDialogProps) => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [investmentPeriod, setInvestmentPeriod] = useState<string>("12");
  const [simulationResults, setSimulationResults] = useState<{
    sharesAmount: number;
    investmentTotal: number;
    dividendIncome: number;
    totalReturn: number;
    totalValue: number;
  } | null>(null);
  
  const { addNotification } = useNotification();
  const calculateSimulation = () => {
    const amount = parseFloat(investmentAmount.replace(/\./g, "").replace(",", "."));
    const period = parseInt(investmentPeriod);
    
    if (isNaN(amount) || amount <= 0) {
        addNotification("info", "Por favor, insira um valor de investimento válido.");
        return;
    }
    if (isNaN(period) || period <= 0) {
      addNotification("info", "Por favor, insira um período válido em meses.");
      return;
    }
    // Calculate shares amount (rounded down to nearest integer)
    const sharesAmount = Math.floor(amount / asset.price);
    
    // Calculate total investment
    const investmentTotal = sharesAmount * asset.price;
    
    // Calculate monthly dividend income
    const monthlyDividendValue = (investmentTotal * (asset.dividendYield / 100)) / 12;
    
    // Calculate total dividend income over the period
    const dividendIncome = monthlyDividendValue * period;
    
    // Calculate total return
    const totalReturn = (dividendIncome / investmentTotal) * 100;
    
    // Calculate final investment value
    const totalValue = investmentTotal + dividendIncome;
    setSimulationResults({
      sharesAmount,
      investmentTotal,
      dividendIncome,
      totalReturn,
      totalValue
    });
  };
  // Format currency function
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and commas
    const value = e.target.value.replace(/[^0-9,.]/g, "");
    setInvestmentAmount(value);
  };
  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow positive integers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInvestmentPeriod(value);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border border-indigo-100 dark:border-indigo-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-indigo-950 dark:text-white">
            <Calculator className="h-5 w-5 text-indigo-600" />
            Simulação de Investimento
          </DialogTitle>
          <DialogDescription className="text-indigo-700 dark:text-indigo-300">
            Simule o rendimento de {asset.name} com base no seu valor de investimento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="investmentAmount" className="text-indigo-900 dark:text-indigo-200">
              Valor do investimento
            </Label>
            <Input
              id="investmentAmount"
              placeholder="R$ 1.000,00"
              value={investmentAmount}
              onChange={handleInvestmentAmountChange}
              className="border-indigo-200 dark:border-indigo-800"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="investmentPeriod" className="text-indigo-900 dark:text-indigo-200">
              Período (meses)
            </Label>
            <Input
              id="investmentPeriod"
              placeholder="12"
              value={investmentPeriod}
              onChange={handlePeriodChange}
              className="border-indigo-200 dark:border-indigo-800"
            />
          </div>
          {simulationResults && (
            <div className="bg-white dark:bg-indigo-900/50 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800 mt-2 space-y-3">
              <h3 className="font-medium text-lg text-indigo-800 dark:text-indigo-200 border-b border-indigo-100 dark:border-indigo-800 pb-2">
                Resultados da simulação
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Quantidade de cotas</p>
                  <p className="font-medium text-indigo-950 dark:text-white">{simulationResults.sharesAmount} cotas</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Investimento total</p>
                  <p className="font-medium text-indigo-950 dark:text-white">{formatCurrency(simulationResults.investmentTotal)}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Renda de dividendos</p>
                  <p className="font-medium text-indigo-950 dark:text-white">{formatCurrency(simulationResults.dividendIncome)}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Retorno total</p>
                  <p className="font-medium text-indigo-950 dark:text-white">{simulationResults.totalReturn.toFixed(2)}%</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Valor final após {investmentPeriod} meses</p>
                  <p className="font-bold text-xl text-indigo-950 dark:text-white">{formatCurrency(simulationResults.totalValue)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
          >
            Fechar
          </Button>
          <Button 
            onClick={calculateSimulation}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Calcular simulação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentSimulationDialog;
