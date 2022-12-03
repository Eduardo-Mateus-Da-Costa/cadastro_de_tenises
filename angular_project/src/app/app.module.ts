import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilModule } from './util/util.module';
import { HomeComponent } from './features/home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
