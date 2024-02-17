import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreadsComponent } from './pages/spreads/spreads.component';

const routes: Routes = [
  { path: 'spreads', component: SpreadsComponent },
  { path: '**', redirectTo: 'spreads' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpreadsRoutingModule {}
