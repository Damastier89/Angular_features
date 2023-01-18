import { Component, OnInit, Input } from '@angular/core';
import { FBStorageService, FileUpload } from '../shared/storage/fb-storage.service';

@Component({
	selector: 'app-loading-data-details',
	templateUrl: './loading-data-details.component.html',
	styleUrls: ['./loading-data-details.component.scss'],
})
export class LoadingDataDetailsComponent implements OnInit {
	@Input() public fileUpload!: FileUpload;

	constructor(private fbStorageService: FBStorageService) {}

	ngOnInit(): void {
		console.log(`fileUpload`, this.fileUpload);
	}

	public deleteFileUpload(fileUpload: FileUpload): void {
		this.fbStorageService.deleteFile(fileUpload);
	}
}
