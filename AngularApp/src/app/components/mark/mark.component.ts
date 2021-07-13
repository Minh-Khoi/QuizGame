import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendURLService } from '../../services/backend-url.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  data = {mark:null, got_top: null};
  candidateLookUp = null;
  candidateEditing = null;

  constructor(
    private router: ActivatedRoute,
    private routeNavigator: Router
    ) { }

  ngOnInit() {
    if (!this.router.snapshot.params.candidateLookUp) {
      this.data = JSON.parse(this.router.snapshot.params.data);
      // console.log(JSON.parse(this.router.snapshot.params.data));
    } else {
      this.candidateLookUp = JSON.parse(this.router.snapshot.params.candidateLookUp);
      this.candidateEditing = (this.router.snapshot.params.editing == "true") ? true : false;
      this.data = { mark: this.candidateLookUp.mark, got_top: true };
    }

    // console.log((this.candidateLookUp !=null) && (this.candidateEditing == 'false'));
    // console.log(this.candidateEditing + "----" + typeof this.candidateEditing);
  }

  /** If the client click "NO" button */
  onNoClicked(event:Event) {
    event.stopPropagation();
    this.routeNavigator.navigate(["/"])
  }

  /** ANd If the client click YES */
  async onYesClicked(event:Event) {
    event.stopPropagation();
    // console.log("hichic");
    let formElement = <HTMLFormElement>document.querySelector("#form_mark");
    let formData = new FormData(formElement);
    if (this.candidateLookUp ) {
      if (this.candidateEditing) {
        formData.append("activity", "update_candidate");
        formData.append("id", this.candidateLookUp.id);
        await fetch(BackendURLService.backendURL, {
          body: formData, method: "POST"
        }).then(response => response.text())
          .then(result => {
            if (result.length > 0) {
              alert(result);
            } else {
              this.routeNavigator.navigate(["/top_list"]);
            }
          })
      } else {
        this.routeNavigator.navigate(["/top_list"]);
      }
    } else {
      formData.append("activity", "add_new_candidate");
      formData.append("mark", this.data.mark);
      await fetch(BackendURLService.backendURL, {
        body:formData, method: "POST"
      }).then(response => {
        if (response.status != 200) {
          console.log("activity add_new_candidate FAILED");
        }else {
          return response.text();
        }
      }).then(result => {
          this.routeNavigator.navigate(['/token',{token: result}]);
      })
    }
  }

  /** ANd If the client click YES */
  async onDeleteClicked() {
    let formElement = <HTMLFormElement>document.querySelector("#form_mark");
    let formData = new FormData(formElement);
    formData.append("activity", "delete_candidate");
    formData.append("id", this.candidateLookUp.id);

    await fetch(BackendURLService.backendURL, {
      body:formData, method:"POST"
    }).then(response => response.text())
      .then(result => {
        if (result.length > 0) {
          alert(result);
        } else {
          this.routeNavigator.navigate(["/top_list"]);
        }
    })
  }

  /** Check to disable the form */
  formIsReady() {
    if (this.data.got_top && !this.candidateLookUp) {
      // console.log("formIsReady 1")
      return false;
    } else if ( (this.candidateLookUp !=null) && (this.candidateEditing)) {
      // console.log("formIsReady 2")
      return false;
    }
    return true;
  }

  /** Go to the Top List page */
  seeTopList() {
    this.routeNavigator.navigate(['/top_list']);
  }
}
