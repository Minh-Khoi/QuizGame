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
      this.data = (this.router.snapshot.params.data);
    } else {
      this.candidateLookUp = JSON.parse(this.router.snapshot.params.candidateLookUp);
      this.candidateEditing = (this.router.snapshot.params.editing);
      // console.log(JSON.parse(this.router.snapshot.params.candidateLookUp));
      this.data = { mark: this.candidateLookUp.mark, got_top: true };
    }

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
        await fetch(BackendURLService.backendURL, {
          body: formData, method: "POST"
        })
        this.routeNavigator.navigate(["/top_list"]);
      }
    } else {
      formData.append("activity", "add_new_candidate");
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
}
