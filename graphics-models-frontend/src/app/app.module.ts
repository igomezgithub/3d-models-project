import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImagesComponent } from './images/images.component';
import { ImageService } from './images/image.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './images/details/details.component';
import { FormsModule } from '@angular/forms';
import { LoadComponent } from './images/load/load.component';

const routes: Routes = [
  {path: '', redirectTo: '/images', pathMatch: 'full'},
  {path: 'images', component: ImagesComponent},
  {path: 'images/details', component: DetailsComponent},
  {path: 'images/details/:id', component: DetailsComponent},
  {path: 'images/load/:id', component: LoadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImagesComponent,
    DetailsComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
