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

	public drawCanvas(): void {
		this.context.fillStyle = 'rgba(71, 144, 155, 0.8)'; // стиль заливки фигуры
		this.context.fillRect(20,20, 100, 100); // рисуем квадрат

		this.context.lineWidth = 5; // толщина воображаемого карандаша при рисовании
		this.context.strokeStyle = 'rgba(242, 244, 28, 1)' // стиль заливки контуров фигуры
		this.context.strokeRect(20,20, 100, 100); // стиль для заливки линии контура
	}

	private initCanvas(): void {
		this.context = this.canvasForDrawing.nativeElement.getContext('2d') as CanvasRenderingContext2D;
		let width = this.context.canvas.width = document.documentElement.clientWidth - 345;
		let height = this.context.canvas.height = document.documentElement.clientHeight - 72;
		this.context.fillStyle = 'dotted 1px black';
		this.context.fillRect(0,0, width, height);
	}
}
