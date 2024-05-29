import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class ExchangeFormFieldService {
  constructor(private readonly fb: FormBuilder) {}

  public getExchangeForm(): FormGroup {
    return this.fb.group({
      baseCurrency: ['', Validators.required],
      quoteCurrency: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }
}
