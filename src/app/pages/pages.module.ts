import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { GaleriaFotosComponent } from './mantenimiento/galeria-fotos/galeria-fotos.component';
import { NoticiaComponent } from './mantenimiento/noticia/noticia.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NoticiaListComponent } from './mantenimiento/noticia/noticia-list/noticia-list.component';
import { GaleriaListComponent } from './mantenimiento/galeria-fotos/galeria-list/galeria-list.component';
import { GaleriaEditComponent } from './mantenimiento/galeria-fotos/galeria-edit/galeria-edit.component';
import { NoticiaEditComponent } from './mantenimiento/noticia/noticia-edit/noticia-edit.component';
import { NgMaterialMultilevelMenuModule, ɵb } from 'ng-material-multilevel-menu';


@NgModule({
  declarations: [

    InicioComponent,
      GaleriaFotosComponent,
      NoticiaComponent,
      NoticiaListComponent,
      GaleriaListComponent,
      GaleriaEditComponent,
      NoticiaEditComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    AngularEditorModule
  ],

})
export class PagesModule { }
