import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { restEndpoints } from "../../../shared/endpoints/rest-endpoints";
import { Currency } from "../../../shared/interfaces";

@Injectable()
export class CurrencyDataHttpService {

  constructor(private readonly http: HttpClient) { }

  public getCurrency(baseCurrency?: string): Observable<Currency> {
    return this.http.get<Currency>(restEndpoints.getExchanges(baseCurrency));
  }
}
