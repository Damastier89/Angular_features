import { Observable, interval, startWith, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public actualDate: Observable<string> = interval(1000)
    .pipe(
      startWith(new Date()),
      map(() => new Date().toString())
      );

  goToView() {
    this.router.navigate(['/view-child'])
  }    

}
