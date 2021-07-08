import { Component, OnInit } from '@angular/core';
import { BackendURLService } from '../../services/backend-url.service';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent implements OnInit {
  topList = [];

  constructor() { }

  async ngOnInit() {
    let formData = new FormData();
    formData.append("activity","load_top_list")
    await fetch(BackendURLService.backendURL, {
      body: formData,
      method: "POST"
    }).then(respose => respose.text())
      .then(result => {
        this.topList = JSON.parse(result);
      })
  }

}
