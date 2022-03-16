import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';



@NgModule({
  declarations: [HeaderComponent, ConfirmDialogComponent,LoginComponent,LogoutComponent, ProgressSpinnerComponent, SideNavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ConfirmDialogComponent,
    LogoutComponent,
    LoginComponent,
    ProgressSpinnerComponent,
    SideNavbarComponent
  ],
  entryComponents: [ConfirmDialogComponent]

})
export class SharedModule { }
