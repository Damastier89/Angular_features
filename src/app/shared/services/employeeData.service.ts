import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EmployeeDataService {
    public getNameCurrentUser(): any {
        try {
            const user: any = localStorage.getItem('user');
            const employee = JSON.parse(user);
            return employee;
        } catch (error) {
            console.log(`Error getting current user name`, error);
            return error;
        }
    }

    public setDataCurrentUser(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.log(`Error saving to localStorage current user name`, error);
        }
    }
}
