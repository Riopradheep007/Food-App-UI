import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {
   path:'',
   component:LoginComponent
  },
  {
    path:"auth",
    loadChildren:() =>
    import('./authentication/authentication.module').then((m)=> m.AuthenticationModule),
  },
  {
    path:"",
    children:[
      {
      path:"",
      loadChildren: () =>
      import ('./features/features.module').then((m) => m.FeaturesModule),
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
