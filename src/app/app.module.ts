import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {provideHttpClient} from "@angular/common/http";
import { SvgRenderComponent } from './components/svg-render/svg-render.component';
import { SvgContainerComponent } from './components/svg-container/svg-container.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgRenderComponent,
    SvgContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
      provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
