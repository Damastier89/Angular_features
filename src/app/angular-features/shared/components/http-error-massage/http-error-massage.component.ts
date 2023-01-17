import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorsInterface } from '../../../../shared/interfaces/httpErrors.interface';

@Component({
  selector: 'app-custom-http-error-massage',
  templateUrl: './http-error-massage.component.html',
  styleUrls: ['./http-error-massage.component.scss']
})
export class HttpErrorMassageComponent implements OnInit {
  /**
   * httpErrors - это alias для @Input().
   * Alias желателен, для того чтобы отличить в коде обычную переменную от @Input() свойства.
   */
  @Input() public httpErrorsProps!: HttpErrorsInterface | null;
  public httpErrorMassage: HttpErrorsInterface | null = null;

  ngOnInit(): void {
    this.httpErrorMassage = this.httpErrorsProps;
    this.changeValueErrorMassage();
  }

  public changeValueErrorMassage(): void {
    setInterval(() => {
      if(this.httpErrorMassage !== null) {
        this.httpErrorMassage = null;
      }
    }, 5000);
  }
}
