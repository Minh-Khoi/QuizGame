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
  timeOfQuiz = 0;
  numOfQuestions = 0;

  constructor(
    private router : Router
  ) { }

  async ngOnInit() {  }

  /** When the client finish the quiz and click the "Submmit" button */
  async submitQuiz(event: Event = null) {
    if (event) {
      event.stopPropagation();
    }
    if (this.listQuestions.length == 0) {
      return;
    }
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
      // console.log(typeof(result));
        this.router.navigate(["/quiz_handled", { data: result }]);
    })
  }

  /** load and display the list of questions from server*/
  async loadQuestions() {
    let formData = new FormData();
    // first fix the title (with the time)
    let elementDivSubheader7 = <HTMLDivElement> document.querySelector("#subHeader_7");
    let elementH2Header7 = <HTMLHeadingElement>document.querySelector("#header_7");
    let elementDivContains = <HTMLDivElement>document.querySelector(".form-header-group.header-default");
    elementH2Header7.style.position = "fixed";
    elementH2Header7.style.top = "0";
    elementH2Header7.style.backgroundColor = "hsla(0, 50%, 60%, 0.3)";
    elementDivSubheader7.style.paddingTop = elementH2Header7.offsetHeight.toString() + "px";
    elementDivContains.style.paddingTop = "0";

    /// Then send API in order to load the list questions
    formData.append("activity", "load_questions_list");
    formData.append("numOfQuestions", this.numOfQuestions.toString());
    // let listQuestionDemo = null;
    await fetch(BackendURLService.backendURL, {
      body: formData, method: "POST",
    }).then(response => response.text())
      .then(result => {
        let listQuestions = (JSON.parse(result));
        // let ques: string;
        for (let ques of listQuestions) {
          ques[1] = ques[1].replace("A.", "</b><br/>A.");
          ques[1] = ques[1].replace("B.", "<br/>B.");
          ques[1] = ques[1].replace("C.", "<br/>C.");
          ques[1] = ques[1].replace("D.", "<br/>D.");
          ques[1] = ques[1].replace("E.", "<br/>E.");
          ques[1] = ques[1].replace("F.", "<br/>F.");
          ques[1] = ques[1].replace("G.", "<br/>G.");
          // console.log(ques);
          this.listQuestions.push(ques);
        }
        this.setTimeForQuiz(this.numOfQuestions);
      });
  }

  /** Set time out for the Quiz form */
  async setTimeForQuiz(numOfQuestions:number) {
    let timeOfQuizBeggin = 15 * ((numOfQuestions<30) ? 30 : numOfQuestions);
    this.timeOfQuiz =  timeOfQuizBeggin;
    let theInterval = setInterval(() => {
      this.timeOfQuiz -= 1;
      if (this.timeOfQuiz <= 0) {
        this.submitQuiz()
        // this.router.navigate(["/quiz_handled",{data: JSON.parse(result)}])
        clearInterval(theInterval);
      }
    },  1000);
  }

  /** UPdate property "numOfQuestions" depend on the first input under Title */
  updateNumOfQuestion(event) {
    this.numOfQuestions = event.target.value;
  }
}
