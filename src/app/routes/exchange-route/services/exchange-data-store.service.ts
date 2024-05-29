import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { Currency, Nullable } from "../../../shared/interfaces";
import { Conversion } from "../interfaces";

@Injectable()
export class ExchangeDataStoreService {
  public currency$: Observable<Currency>;
  public conversion$: Observable<Nullable<Conversion>>;

  private readonly _currencySubject = new ReplaySubject<Currency>(1);
  private readonly _conversionSubject = new ReplaySubject<Nullable<Conversion>>(1);

  constructor() {
    this.currency$ = this._currencySubject.asObservable();
    this.conversion$ = this._conversionSubject.asObservable();
  }

  public setCurrency(currency: Currency): void {
    this._currencySubject.next(currency);
  }

  public setConversion(conversion: Nullable<Conversion>): void {
    this._conversionSubject.next(conversion);
  }
}
