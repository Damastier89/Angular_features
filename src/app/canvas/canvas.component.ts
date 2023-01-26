import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit{
	@ViewChild('canvasForDrawing', {static: true}) public canvasForDrawing!: ElementRef<HTMLCanvasElement>;
	public context!: CanvasRenderingContext2D;
	public canvas: string = 'Canvas';

	ngOnInit(): void {
		this.initCanvas();
	}

	constructor() {}

	public drawRect(): void {
		// fillRect, strokeRect начинают рисовать от верхнего левого угла (x,y), затем идет ширина и высота.
		this.context.fillStyle = 'rgba(11, 160, 47, 0.8)'; // стиль заливки всей фигуры
		this.context.fillRect(20,20, 100, 100); // рисуем квадрат

		this.context.lineWidth = 5; // толщина воображаемого карандаша при рисовании
		this.context.strokeStyle = 'rgba(11, 81, 160, 0.8)' // стиль заливки контуров фигуры
		this.context.strokeRect(20,20, 100, 100); // стиль для заливки линии контура
	}

	public deleteRect(): void {
		this.context.clearRect(20,20, 100, 100); // удалить прямоугольник
	}

	private initCanvas(): void {
		this.context = this.canvasForDrawing.nativeElement.getContext('2d') as CanvasRenderingContext2D; // Инициализируем canvas
		let width = this.context.canvas.width = document.documentElement.clientWidth - 345; // задаем ширину
		let height = this.context.canvas.height = document.documentElement.clientHeight - 72; // задаем высоту
		this.context.fillStyle = 'dotted 1px black'; // стиль заливки всей фигуры
		this.context.fillRect(0,0, width, height); // рисуем квадрат
	}
}
