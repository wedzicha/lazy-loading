import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotosListItemComponent } from './components/photos-list/photos-list-item/photos-list-item.component';
import { CommonModule } from '@angular/common';
import { JsonPlaceholderService } from './core/services/jsonplaceholder-service/json-placeholder.service';
import { LazyLoadingDirective } from './shared/directives/lazy-loading/lazy-loading.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadingService } from './shared/directives/lazy-loading/lazy-loading.service';
import { ImageLoaderDirective } from './components/photos-list/photos-list-item/image-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    PhotosListComponent,
    PhotosListItemComponent,
    LazyLoadingDirective,
    ImageLoaderDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [JsonPlaceholderService, LazyLoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
