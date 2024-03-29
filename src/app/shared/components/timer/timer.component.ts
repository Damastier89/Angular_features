import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
	public year: any = new Date().getFullYear();

	constructor() {}

	ngOnInit(): void {
		this.timer('.timer', '2023-12-31');
	}

	public timer(id: string, deadLine: string) {
		function getTimeRemaining(endtime: any) {
			const t: any = Date.parse(endtime) - Date.parse(new Date().toString()),
				days = Math.floor(t / (1000 * 60 * 60 * 24)), // кол-во миллисекунд в дне
				hours = Math.floor((t / (1000 * 60 * 60)) % 24),
				minutes = Math.floor((t / 1000 / 60) % 60),
				seconds = Math.floor((t / 1000) % 60);

			return {
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			};
		}

		function getZero(num: any) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		function setClock(selector: any, endtime: any) {
			const timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);

			updateClock();

			function updateClock() {
				const t = getTimeRemaining(endtime);

				days.textContent = getZero(t.days);
				hours.textContent = getZero(t.hours);
				minutes.textContent = getZero(t.minutes);
				seconds.textContent = getZero(t.seconds);

				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			}
		}

		setClock(id, deadLine);
	}
}
