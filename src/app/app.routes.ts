import { Routes } from '@angular/router';
import { App } from './app';
import { Inverter } from './inverter/inverter';
import { Main } from './main/main';
import { Results } from './results/results';

export const routes: Routes = [
  { path: 'inverter/:id', component: Inverter },
  { path: 'results', component: Results },
  { path: '', component: App },
];
