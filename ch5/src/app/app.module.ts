import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWigModule } from 'ngx-wig';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxWigModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
