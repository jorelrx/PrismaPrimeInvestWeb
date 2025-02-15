import { CreateWalletFund, WalletFund } from '@/types/relationship/WalletFund';
import { BaseService } from './BaseService';

class WalletFundService extends BaseService<WalletFund, CreateWalletFund> {
  constructor() {
    super('/WalletFund');
  }
}

export default WalletFundService;
