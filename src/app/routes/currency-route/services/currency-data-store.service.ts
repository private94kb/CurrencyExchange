import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { Currency } from "../../../shared/interfaces";

@Injectable()
export class CurrencyDataStoreService {
  public currency$: Observable<Currency>;

  private readonly _currencySubject = new ReplaySubject<Currency>(1);

  constructor() {
    this.currency$ = this._currencySubject.asObservable();
  }

  public setCurrency(currency: Currency): void {
    this._currencySubject.next(currency);
  }
}
