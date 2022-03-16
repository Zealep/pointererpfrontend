import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BasicAuthHtppInterceptorService } from './services/basic-auth-interceptor.service';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule, ɵb } from 'ng-material-multilevel-menu';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    PdfViewerModule,
    NgMaterialMultilevelMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true  },
    {provide: ɵb },
    MultilevelMenuService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
