import { IWallet } from "@/types/user/IWallet";
import { BaseService } from "./BaseService";
import { CreateWalletDto } from "@/dtos/CreateWalletDto";

class WalletService extends BaseService<IWallet, CreateWalletDto> {
    constructor() {
        super("/wallet");
    }
}

export default WalletService;
