import { Routes } from '@angular/router';
import { App } from './app';
import { Inverter } from './inverter/inverter';
import { Main } from './main/main';
import { Results } from './results/results';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'inverter/:id', component: Inverter, canActivate: [authGuard] },
  { path: 'results', component: Results, canActivate: [authGuard] },
  { path: '', component: App },
];
