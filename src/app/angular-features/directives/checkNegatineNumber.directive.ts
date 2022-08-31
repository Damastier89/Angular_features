import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: '[checkNegativeNumber]'
})
export class CheckNegativeNumber {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // console.log(`checkNegativeNumber `, event);
    if (event.key === '-' && event.code === 'Minus') {
      event.preventDefault();
    }
  }
}
