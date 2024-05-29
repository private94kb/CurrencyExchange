import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExchangeDataHttpService, ExchangeDataStoreService, ExchangeFormFieldService } from "../../services";
import { filter, startWith, Subject, take, takeUntil, withLatestFrom } from "rxjs";
import { KeyValue, KeyValuePipe } from "@angular/common";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  providers: [ExchangeDataStoreService]
})
export class ExchangeComponent implements OnInit, OnDestroy {
  public currency$ = this.exchangeDataStore.currency$;
  public conversion$ = this.exchangeDataStore.conversion$;
  public conversionForm = this.exchangeFormField.getExchangeForm();
  public filteredBaseCoin: KeyValue<string, number>[] = [];
  public filteredExternalCoin: KeyValue<string, number>[] = [];

  private readonly _completeSubject = new Subject<void>()

  constructor(
    private readonly keyValuePipe: KeyValuePipe,
    private readonly exchangeDataHttp: ExchangeDataHttpService,
    private readonly exchangeDataStore: ExchangeDataStoreService,
    private readonly exchangeFormField: ExchangeFormFieldService
  ) { }

  public ngOnInit(): void {
    this.getCurrency();
  }

  public onResetFromClick() {
    this.conversionForm.reset();
    this.exchangeDataStore.setConversion(null)
  }

  public onSubmitFormClick() {
    this.exchangeDataHttp.getConvertedData(this.conversionForm.value)
      .pipe(take(1))
      .subscribe(conversion => {
        this.exchangeDataStore.setConversion(conversion);
    })
  }

  public ngOnDestroy(): void {
    this._completeSubject.next();
    this._completeSubject.complete();
  }

  private getFilteredValue(filter: string, value: KeyValue<string, number>[]): KeyValue<string, number>[] {
    if (!filter) return value;
    return value.filter(({key}) => key.toLowerCase().startsWith(filter.toLowerCase()));
  }

  private setFormSubscriptions(): void {
    this.conversionForm.valueChanges
      .pipe(
        withLatestFrom(this.exchangeDataStore.conversion$),
        filter(([_, conversion]) => !!conversion),
        takeUntil(this._completeSubject)
      )
      .subscribe(() => this.exchangeDataStore.setConversion(null));

    this.conversionForm.get("baseCurrency")?.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.exchangeDataStore.currency$),
      takeUntil(this._completeSubject)
    )
      .subscribe(([formValue, currency]) => {
        this.filteredBaseCoin = this.getFilteredValue(formValue, this.keyValuePipe.transform(currency.conversion_rates));
    })

    this.conversionForm.get("quoteCurrency")?.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.exchangeDataStore.currency$),
      takeUntil(this._completeSubject)
    )
      .subscribe(([formValue, currency]) => {
        this.filteredExternalCoin = this.getFilteredValue(formValue, this.keyValuePipe.transform(currency.conversion_rates));
    })
  }

  private getCurrency(): void {
    this.exchangeDataHttp.getCurrency().pipe(take(1)).subscribe(currency => {
      this.exchangeDataStore.setCurrency(currency);
      this.setFormSubscriptions();
    });
  }
}
