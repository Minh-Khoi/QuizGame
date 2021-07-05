import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  route_params = {};
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.route_params = (this.router.snapshot.params);

  }

}
