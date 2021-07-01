import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendURLService {
  public static backendURL = "http://localhost:3000/controller.php";
  constructor() { }
}
