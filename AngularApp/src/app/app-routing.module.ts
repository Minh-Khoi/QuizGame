import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {AppComponent} from './app.component';
import { QuizComponentComponent } from './components/quiz-component/quiz-component.component';
import { MarkComponent } from './components/mark/mark.component';
import { TopListComponent} from './components/top-list/top-list.component';
import { TokenScreenComponent } from './components/token-screen/token-screen.component';



const routes: Routes = [
  { path: "", component: QuizComponentComponent },
  { path: "quiz_handled", component: MarkComponent },
  { path: "top_list", component: TopListComponent },
  {path:"token",component: TokenScreenComponent}
  // {}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
