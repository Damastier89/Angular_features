import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorsInterface } from '../../store/types/httpErrors.interface';

@Component({
  selector: 'mc-http-error-massage',
  templateUrl: './http-error-massage.component.html',
  styleUrls: ['./http-error-massage.component.scss']
})
export class HttpErrorMassageComponent implements OnInit {
  /**
   * httpErrors - это alias для @Input(). 
   * Alias желателен для того чтобы отличить в коде обычную пременную от @Input() свойства.
   */
  @Input('httpErrors') public httpErrorsProps!: HttpErrorsInterface | null;
  public httpErrorMassage!: any;

  ngOnInit(): void {
    console.log(`this.httpErrorsProps`, this.httpErrorsProps);
    this.httpErrorMassage = this.httpErrorsProps;
  }
}