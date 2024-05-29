import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './components/currency/currency.component';
import { RouterModule, Routes } from "@angular/router";

import { MatCardModule } from "@angular/material/card";
import { CurrencyFilterPipe } from './pipes/currency-filter.pipe';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

import * as services from './services';

const routes: Routes = [{
  path: '',
  component: CurrencyComponent
}]

@NgModule({
  declarations: [
    CurrencyComponent,
    CurrencyFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [services.CurrencyDataHttpService]
})
export class CurrencyRouteModule { }
