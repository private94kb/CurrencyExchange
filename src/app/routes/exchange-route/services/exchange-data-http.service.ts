import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { restEndpoints } from "../../../shared/endpoints/rest-endpoints";
import { ConvertParam } from "../interfaces/convert-param.interface";
import { Currency } from "../../../shared/interfaces";
import { Conversion } from "../interfaces";

@Injectable()
export class ExchangeDataHttpService {

  constructor(private readonly http: HttpClient) { }

  public getCurrency(baseCurrency?: string): Observable<Currency> {
    return this.http.get<Currency>(restEndpoints.getExchanges(baseCurrency));
  }

  public getConvertedData({baseCurrency, quoteCurrency, amount}: ConvertParam): Observable<Conversion> {
    return this.http.get<Conversion>(restEndpoints.getConvertedData(baseCurrency, quoteCurrency), {
      params: { amount }
    })
  }
}
