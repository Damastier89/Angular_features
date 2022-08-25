import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: '[checkSpecialCharacters]'
})
export class CheckSpecialCharacters {

  public numbers = [
    '!', '@', '#', '$', '%', '&', '?', '-', '+', '=',
    '~', '>', '<', '/', '|', '\\', '[', ']', '{', '}',
    ',', '.', '_',
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // console.log(`CheckNumbers `, event);
    this.numbers.forEach(num => {
      if (event.key === num) {
        event.preventDefault();
      }
    })
  }
}
