import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAmigoComponent } from './pages/registro-amigo/registro-amigo.component';
import { ListaAmigoComponent } from './pages/lista-amigo/lista-amigo.component';

const routes: Routes = [{ path: '', redirectTo: 'registrar-amigo', pathMatch: 'full' },
  { path: 'registrar-amigo', component: RegistroAmigoComponent },
  { path: 'listar-amigo', component: ListaAmigoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
