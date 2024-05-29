import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home-route/home-route.module').then(m => m.HomeRouteModule)
      },
      {
        path: 'exchange',
        loadChildren: () => import('../exchange-route/exchange-route.module').then(m => m.ExchangeRouteModule)
      },
      {
        path: 'currency',
        loadChildren: () => import('../currency-route/currency-route.module').then(m => m.CurrencyRouteModule)
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
