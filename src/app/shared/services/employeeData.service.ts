import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  public getNameCurrentUser(): string {
    const user: any = localStorage.getItem('user');
    const employee = JSON.parse(user);
    return employee;
  }
}