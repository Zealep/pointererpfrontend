
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { GaleriaFotosComponent } from './mantenimiento/galeria-fotos/galeria-fotos.component';
import { NoticiaComponent } from './mantenimiento/noticia/noticia.component';
import { NoticiaListComponent } from './mantenimiento/noticia/noticia-list/noticia-list.component';
import { GaleriaListComponent } from './mantenimiento/galeria-fotos/galeria-list/galeria-list.component';
import { NoticiaEditComponent } from './mantenimiento/noticia/noticia-edit/noticia-edit.component';
import { GaleriaEditComponent } from './mantenimiento/galeria-fotos/galeria-edit/galeria-edit.component';
import { RequisicionPersonalComponent } from './mantenimiento/requisicion-personal/requisicion-personal.component';
import { RequisicionPersonalListComponent } from './mantenimiento/requisicion-personal/requisicion-personal-list/requisicion-personal-list.component';
import { ConsultaDocumentosElectronicosComponent } from './compras/consulta-documentos-electronicos/consulta-documentos-electronicos.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [ //
      {
        path: '', //
        pathMatch: 'full',
        component: InicioComponent
      },
      {
        path: 'galeria', //
        component: GaleriaListComponent
      },
      {
        path: 'galeria/add', //
        component: GaleriaFotosComponent
      },
      {
        path: 'galeria/edit/:id', //
        component: GaleriaEditComponent
      },
      {
        path: 'noticia', //
        component: NoticiaListComponent
      },
      {
        path: 'noticia/add', //
        component: NoticiaComponent
      },
      {
        path: 'noticia/edit/:id', //
        component: NoticiaEditComponent
      },
      {
        path: 'requisicion/add', //
        component: RequisicionPersonalComponent
      },
      {
        path: 'requisicion/edit/:id', //
        component: RequisicionPersonalComponent
      },
      {
        path: 'bandejaRequisicion', //
        component: RequisicionPersonalListComponent
      },

      {
        path: 'consultaValidez', //
        component: ConsultaDocumentosElectronicosComponent
      },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
