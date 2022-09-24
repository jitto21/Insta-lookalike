import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material-module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { pageAnimation } from 'src/animations/page.animation';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BookmarkComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      navAnimation: pageAnimation
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
