import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit{
	// https://www.html5canvastutorials.com/tutorials/html5-canvas-line-caps/
	// https://www.youtube.com/watch?v=SVrbUWEyy6k&list=PLpY_9m7gHQDgKMb4U2u8X8JU0lDlCYFQ4&index=21
	// https://rgbacolorpicker.com/
	// https://www.w3schools.com/graphics/canvas_intro.asp

	@ViewChild('canvasForDrawing', {static: true}) public canvasForDrawing!: ElementRef<HTMLCanvasElement>;
	public context!: CanvasRenderingContext2D;
	public canvas: string = 'Canvas';

	ngOnInit(): void {
		this.initCanvas();
	}

	constructor() {}

	public drawLine(): void {
		for (let i = 0; i < 10; i++) {
			this.context.beginPath(); // Указываем canvas что собираемся рисовать
			this.context.lineWidth = i + 1;
			this.context.moveTo(200, 20 + i * 15);
			this.context.lineTo(450, 20 + i * 15);
			this.context.strokeStyle = 'rgba(239, 242, 8, 0.89)';
			this.context.stroke(); // Собирает все переданные опции и рисует линию
		}
	}

	public drawRect(): void {
		// fillRect, strokeRect начинают рисовать от верхнего левого угла (x,y), затем идет ширина и высота.
		this.context.fillStyle = 'rgba(11, 160, 47, 0.8)'; // стиль заливки всей фигуры
		this.context.fillRect(20,20, 100, 100); // рисуем квадрат

		this.context.lineWidth = 5; // толщина воображаемого карандаша при рисовании
		this.context.strokeStyle = 'rgba(11, 81, 160, 0.8)' // стиль заливки контуров фигуры
		this.context.strokeRect(20,20, 100, 100); // стиль для заливки линии контура
	}

	public deleteRect(): void {
		this.context.clearRect(0,0, 125, 125); // удалить прямоугольник
	}

	private initCanvas(): void {
		this.context = this.canvasForDrawing.nativeElement.getContext('2d') as CanvasRenderingContext2D; // Инициализируем canvas
		let width = this.context.canvas.width = document.documentElement.clientWidth - 300; // задаем ширину
		let height = this.context.canvas.height = document.documentElement.clientHeight - 82; // задаем высоту
		this.context.fillStyle = 'rgba(210, 206, 204)'; // стиль заливки всей фигуры
		this.context.fillRect(0,0, width, height); // рисуем квадрат
	}
}
