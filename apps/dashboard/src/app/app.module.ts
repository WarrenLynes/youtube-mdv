import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { VideosComponent } from './videos/component';
import { UiModule } from '@youtube-player/ui';
import { AppRoutingModule } from './app-routing.module';
import { CoreStateModule } from '@youtube-player/core-state';
import { CoreDataModule } from '@youtube-player/core-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@youtube-player/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth.interceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent
  ],
  imports: [
    CoreStateModule,
    CoreDataModule,
    UiModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
