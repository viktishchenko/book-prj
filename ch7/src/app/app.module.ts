import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonInfoComponent } from './views/person-info/person-info.component';
import { PanelComponent } from './views/panel/panel.component';
import { ReposComponent } from './views/repos/repos.component';
import { OrgsComponent } from './views/orgs/orgs.component';

@NgModule({
  declarations: [AppComponent, PersonInfoComponent, PanelComponent, ReposComponent, OrgsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
