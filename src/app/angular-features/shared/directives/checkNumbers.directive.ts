import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appCheckNumbers]',
})
export class CheckNumbersDirective {
	public numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		// console.log(`CheckNumbers `, event);
		this.numbers.forEach((num) => {
			if (event.key === num) {
				event.preventDefault();
			}
		});
	}
}
