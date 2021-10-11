import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClubsComponent} from "./clubs/clubs.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClubDetailComponent} from "./clubs/club-detail/club-detail.component";


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'clubs', component: ClubsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: ClubDetailComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
