import { Component } from '@angular/core';
import {BackendURLService} from './services/backend-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';
  listQuestions = [];
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let formData = new FormData();
    formData.append("activity", "load_questions_list");
    let listQuestionDemo = null;
    await fetch(BackendURLService.backendURL , {
      body:formData, method:"POST"
    }).then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
      })

  }
}
