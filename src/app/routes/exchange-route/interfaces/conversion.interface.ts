import { ServiceData } from "../../../shared/interfaces";

export interface Conversion extends ServiceData {
  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result: number;
  amount: number;
}
