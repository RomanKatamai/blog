import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/auth.interceptor";
// import {registerLocaleData} from "@angular/common";
// import ukrLocal from "@angular/common/locales/ru-UA";

const INTERCEPTOR_PROVIDE: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

// registerLocaleData(ukrLocal, 'ua') Локалізація
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDE],
  bootstrap: [AppComponent]
})
export class AppModule { }
