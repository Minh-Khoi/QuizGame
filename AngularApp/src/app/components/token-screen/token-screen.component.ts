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

  /** When the client click "OK" button */
  gotoTopList() {
    this.routeNavigator.navigate(["/top_list"]);
  }

  /** When the client click "Copy" button */
  copyToClipboard() {
    let tokenInputElement = <HTMLInputElement> document.querySelector("#subHeader_7_0 input");
    // it is neccessary to enable the input element, so as to be able to copy its value
    tokenInputElement.disabled = false;
    tokenInputElement.select();
    tokenInputElement.setSelectionRange(0, 99999);
    document.execCommand("copy");
    // after copying, make the input element disabled again
    tokenInputElement.disabled = true;
  }
}
