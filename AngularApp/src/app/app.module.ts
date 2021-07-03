import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,  } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendURLService } from './services/backend-url.service';
import {QuizComponentComponent} from './components/quiz-component/quiz-component.component';
import { MarkComponent } from './components/mark/mark.component';

@NgModule({
  declarations: [
    AppComponent, QuizComponentComponent, MarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BackendURLService],
  bootstrap: [AppComponent]
})
export class AppModule { }
