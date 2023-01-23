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

	public drowCanvas(): void {
		this.context.fillStyle = '#FF0000';
		this.context.fillRect(0,0, 400, 300);
	}

	private initCanvas(): void {
		this.context = this.canvasForDrawing.nativeElement.getContext('2d') as CanvasRenderingContext2D;
	}
}
