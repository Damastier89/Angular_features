import { Component } from "@angular/core";

@Component({
  selector: 'error-page',
  template: `
    <h1>ERROR 404</h1>
    <a routerLink="/">Вернуться</a>
  `
})
export class ErrorPageComponeent {}