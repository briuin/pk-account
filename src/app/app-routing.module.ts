import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: 'account',
    pathMatch: 'full',
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'register',
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: environment.registerModuleUrl,
            remoteName: 'pkAccountRegister',
            exposedModule: './RegisterModule'
          }).then(m => m.RegisterModule)

        // loadChildren: () => import('register/AppModule').then(m => {
        //   console.log(m)
        //   return m.AppModule;
        // })
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule {}
