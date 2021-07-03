import { Component, OnInit } from '@angular/core';
import { BackendURLService } from 'src/app/services/backend-url.service';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-quiz-component',
  templateUrl: './quiz-component.component.html',
  styleUrls: ['./quiz-component.component.css']
})
export class QuizComponentComponent implements OnInit {

  listQuestions = [];
  constructor(
    private router : Router
  ) { }


  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let formData = new FormData();
    formData.append("activity", "load_questions_list");
    // let listQuestionDemo = null;
    await fetch(BackendURLService.backendURL , {
      body: formData, method: "POST",
    }).then(response => response.text())
      .then(result => {
        let listQuestions = (JSON.parse(result));
        // let ques: string;
        for (let ques of listQuestions) {
          ques[1]=ques[1].replace("A.", "</b><br/>A.");
          ques[1]=ques[1].replace("B.", "<br/>B.");
          ques[1]=ques[1].replace("C.", "<br/>C.");
          ques[1]=ques[1].replace("D.", "<br/>D.");
          ques[1]=ques[1].replace("E.", "<br/>E.");
          ques[1]=ques[1].replace("F.", "<br/>F.");
          ques[1] = ques[1].replace("G.", "<br/>G.");
          // console.log(ques);
          this.listQuestions.push(ques);
        }
      })
  }

  async submitQuiz(event) {
    event.preventDefault();
    let formQuiz : HTMLFormElement = <HTMLFormElement> document.getElementById("form_quiz");
    let formDatas = new FormData(formQuiz);
    formDatas.append("activity", "handle_quiz_submitted");
    // this.router.navigate(["/quiz_handled",{data: "hihihihi"}])

    await fetch(BackendURLService.backendURL, {
      body:formDatas, method:"POST"
    }).then(response =>  {
        if (response.status == 200) {
          return response.text()
        } else {
            alert("Connect to server FAILed, please resubmit again")
        }
    }).then(result => {
      this.router.navigate(["/quiz_handled",{data: JSON.parse(result)}])
    })
  }
}
