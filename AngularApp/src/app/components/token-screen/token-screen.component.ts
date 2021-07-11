import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.css']
})
export class TokenScreenComponent implements OnInit {
  token: string = "";

  constructor(
    private router: ActivatedRoute, private routeNavigator : Router
  ) { }

  ngOnInit() {
    this.token = this.router.snapshot.params.token;
  }

  gotoTopList() {
    this.routeNavigator.navigate(["/top_list"]);
  }
}
