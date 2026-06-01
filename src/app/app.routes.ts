import { Routes } from '@angular/router';
import { App } from './app';
import { Inverter } from './inverter/inverter';
import { Main } from './main/main';

export const routes: Routes = [
  { path: 'inverter/:id', component: Inverter },
  { path: '', component: App },
];
