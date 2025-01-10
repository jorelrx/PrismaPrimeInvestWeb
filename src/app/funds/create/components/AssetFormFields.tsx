import { Field } from 'formik'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AssetFormFieldsProps {
  errors: {
    cnpj?: string;
    ticker?: string;
    tipoFundo?: string;
  };
  touched: {
    cnpj?: boolean;
    ticker?: boolean;
    tipoFundo?: boolean;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export default function AssetFormFields({ errors, touched, setFieldValue }: AssetFormFieldsProps) {
  return (
    <>
      <div>
        <Label htmlFor="cnpj">CNPJ</Label>
        <Field
          as={Input}
          id="cnpj"
          name="cnpj"
          placeholder="00.000.000/0000-00"
        />
        {errors.cnpj && touched.cnpj && (
          <p className="text-sm text-red-500 mt-1">{errors.cnpj}</p>
        )}
      </div>

      <div>
        <Label htmlFor="ticker">Ticker</Label>
        <Field
          as={Input}
          id="ticker"
          name="ticker"
          placeholder="ABCD11"
        />
        {errors.ticker && touched.ticker && (
          <p className="text-sm text-red-500 mt-1">{errors.ticker}</p>
        )}
      </div>

      <div>
        <Label htmlFor="tipoFundo">Tipo de Fundo</Label>
        <Select
          onValueChange={(value) => setFieldValue('tipoFundo', value)}
          defaultValue="Fiagro"
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de fundo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fiagro">Fiagro</SelectItem>
            <SelectItem value="Commercial">Fundo</SelectItem>
          </SelectContent>
        </Select>
        {errors.tipoFundo && touched.tipoFundo && (
          <p className="text-sm text-red-500 mt-1">{errors.tipoFundo}</p>
        )}
      </div>
    </>
  )
}

