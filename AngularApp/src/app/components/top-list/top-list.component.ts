import { Component, OnInit } from '@angular/core';
import { BackendURLService } from '../../services/backend-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent implements OnInit {
  topList = [];

  constructor(
    private routeNavigator : Router
  ) { }

  async ngOnInit() {
    let formData = new FormData();
    formData.append("activity","load_top_list")
    await fetch(BackendURLService.backendURL, {
      body: formData,
      method: "POST"
    }).then(respose => respose.text())
      .then(result => {
        this.topList = JSON.parse(result);
        // console.log(this.topList)
      })
  }

  async lookupCandidate(event: Event, isEditing: boolean) {
    console.log(isEditing);
    let targetID = <string> event.target.id;
    let candidateID = targetID.split("_")[1];
    let formData = new FormData();
    formData.append("activity", "lookup_candidate");
    formData.append("candidate_id", candidateID);
    // console.log(candidateID);
    await fetch(BackendURLService.backendURL, {
      body:formData, method:"POST"
    }).then(response => response.text())
      .then(result => {
        // console.log(JSON.parse(result));
        // let candidateLookedUp = JSON.parse(result);
        this.routeNavigator.navigate(['quiz_handled', { candidateLookUp: (result), editing: isEditing }]);
      })
  }

}
