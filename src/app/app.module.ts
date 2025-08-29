import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacasListComponent } from './components/placas-list/placas-list.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { PlacasStudyComponent } from './components/placas-study/placas-study.component';

// Módulo compartilhado
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PlacasListComponent,
    QuizComponent,
    PlacasStudyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
