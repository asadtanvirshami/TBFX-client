import { User } from "../user-type/type";

export interface TradeAcc {
  id: string;
  accountId: string;
  investor_password: string;
  broker_server: string;
  type: string;
  user: User;
}
