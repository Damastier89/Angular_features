import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-matrix',
	template: ` <canvas #canvas></canvas> `,
	styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
	@ViewChild('canvas', { static: true }) public canvas!: ElementRef<HTMLCanvasElement>;

	private context!: CanvasRenderingContext2D;

	private width!: number;

	private height!: number;

	private cols!: number;

	private ypos!: number[];

	ngOnInit(): void {
		// Получить узел холста и контекст рисования
		this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
		this.setMatrix();
		this.interval();
	}

	private interval(): void {
		setInterval(() => {
			this.renderMatrix();
		}, 50);
	}

	private setMatrix(): void {
		// устанавливаем ширину и высоту холста
		this.width = this.context.canvas.width = document.documentElement.clientWidth - 9;
		this.height = this.context.canvas.height = document.documentElement.clientHeight - 9;

		// нарисуем черный прямоугольник такой же ширины и высоты, как у холста
		this.context.fillStyle = '#000';
		this.context.fillRect(0, 0, this.width, this.height);

		// Мы хотим, чтобы текст располагался столбцами. Каждый столбец будет иметь ширину 20 пикселей.
		// И в каждом кадре анимации мы будем ставить по одному символу в конце каждого столбца.
		// Первоначально конец (координата y) каждого столбца равен 0
		this.cols = Math.floor(this.width / 20) + 1;
		this.ypos = Array(this.cols).fill(0);

		// Координаты y для каждого столбца хранятся в массиве ypos.
		// В каждом кадре мы хотим случайным образом сбросить некоторые столбцы, чтобы они снова начинались сверху,
		// чтобы казалось, что столбцы разной высоты падают сверху.
		// Для остальных столбцов мы просто переместим координату y на 20 пикселей вниз,
		// чтобы в следующем кадре новый символ появился ниже текущего.
	}

	private renderMatrix() {
		// Нарисуйте полупрозрачный черный прямоугольник поверх предыдущего рисунка.
		this.context.fillStyle = '#0001';
		this.context.fillRect(0, 0, this.width, this.height);

		// Установите зеленый цвет и моноширинный шрифт 15pt в контексте рисования.
		this.context.fillStyle = '#0f0';
		this.context.font = '15pt monospace';

		// для каждого столбца поставить случайный символ в конце
		this.ypos.forEach((y, ind) => {
			// генерировать случайный character
			const text = String.fromCharCode(Math.random() * 128);
			//const text = `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン`

			// координата x столбца, координата y уже задана
			const x = ind * 20;
			// render the character at (x, y)
			this.context.fillText(text, x, y);

			// случайным образом сбросить конец столбца, если его высота не менее 100 пикселей
			if (y > 100 + Math.random() * 10000) this.ypos[ind] = 0;
			// в противном случае просто переместите координату y для столбца на 20 пикселей вниз
			else this.ypos[ind] = y + 20;
		});
	}
}
