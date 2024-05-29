import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyDataHttpService, CurrencyDataStoreService } from "../../services";
import { Subject, take } from "rxjs";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [CurrencyDataStoreService]
})
export class CurrencyComponent implements OnInit, OnDestroy {
  public currency$ = this.currencyDataStore.currency$;
  public filter = '';
  public baseCoin = 'USD'

  private readonly _completeSubject = new Subject<void>()

  constructor(
    private readonly currencyDataHttp: CurrencyDataHttpService,
    private readonly currencyDataStore: CurrencyDataStoreService
  ) { }

  public ngOnInit(): void {
    this.getCurrency();
  }

  public getCurrency(): void {
    this.currencyDataHttp.getCurrency(this.baseCoin)
      .pipe(take(1))
      .subscribe(currency => {
        this.currencyDataStore.setCurrency(currency)
      })
  }

  public ngOnDestroy(): void {
    this._completeSubject.next();
    this._completeSubject.complete();
  }
}
