import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {AppComponent} from './app.component';
import { QuizComponentComponent } from './components/quiz-component/quiz-component.component';
import { MarkComponent } from './components/mark/mark.component';


const routes: Routes = [
  { path: "", component: QuizComponentComponent },
  { path: "quiz_handled", component: MarkComponent}
  // {}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
