import { UtilModule } from '../../util/util.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './page/login/login.component';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputTextModule,
    FormsModule,
    UtilModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
