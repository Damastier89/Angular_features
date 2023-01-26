import { Component  } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
	public data!: MatSelectChange;
	public food!: MatSelectChange;
	public fruit!: any;
	public fruits: FormControl = new FormControl('');

	public foods = [
		{value: 'картошка', viewValue: 'Картошка'},
		{value: 'макароны', viewValue: 'Макароны'},
		{value: 'Пельмени', viewValue: 'Пельмени'},
	];

	public select($event: MatSelectChange): void {
		this.data = $event;
	}

	public selectFoods($event: MatSelectChange): void {
		this.food = $event;
	}

	public selectFoodsModelChange(): void {
		this.fruit = this.fruits.value;
		console.log(`fruit`, this.fruit)
	}
}
