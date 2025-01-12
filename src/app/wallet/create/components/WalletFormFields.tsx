import { Field } from 'formik'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WalletFormFieldsProps {
  errors: {
    walletName?: string;
  };
  touched: {
    walletName?: boolean;
  };
}

export default function WalletFormFields({ errors, touched }: WalletFormFieldsProps) {
    return (
        <div>
            <Label htmlFor="walletName">Nome da Wallet</Label>
            <Field
                as={Input}
                id="walletName"
                name="walletName"
                placeholder="Nome da Wallet"
            />
            {errors.walletName && touched.walletName && (
                <p className="text-sm text-red-500 mt-1">{errors.walletName}</p>
            )}
        </div>
    )
}

