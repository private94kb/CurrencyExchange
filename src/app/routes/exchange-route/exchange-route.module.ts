import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { RouterModule, Routes } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";

import * as services from './services';

const routes: Routes = [{
  path: '',
  component: ExchangeComponent
}]

@NgModule({
  declarations: [
    ExchangeComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule
    ],
  providers: [services.ExchangeDataHttpService, services.ExchangeFormFieldService, KeyValuePipe]
})
export class ExchangeRouteModule { }
