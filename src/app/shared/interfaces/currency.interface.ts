import { ServiceData } from "./service-data.interface";

export interface Currency extends ServiceData{
  base_code: string
  conversion_rates: Record<string, number>
}
