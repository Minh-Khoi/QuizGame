import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule,  } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendURLService } from './services/backend-url.service';
import {QuizComponentComponent} from './components/quiz-component/quiz-component.component';
import { MarkComponent } from './components/mark/mark.component';
import { TopListComponent} from './components/top-list/top-list.component';
import { TokenScreenComponent } from './components/token-screen/token-screen.component';

@NgModule({
  declarations: [
    AppComponent, QuizComponentComponent, MarkComponent, TopListComponent, TokenScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule
  ],
  providers: [BackendURLService],
  bootstrap: [AppComponent]
})
export class AppModule { }
