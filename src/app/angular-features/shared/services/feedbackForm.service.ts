import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FbCreateResponse } from '../../../admin/shared/interfaces/fbCreateResponse';
import { environment } from '../../../../environments/environment';
import { DataFormInterface } from '../interfaces/dataForm.interface';

const environments = environment.fbDbUrl;

@Injectable()
export class FeedbackFormService {
	constructor(private http: HttpClient) {}

	public createNewDataFromForm(data: DataFormInterface): Observable<DataFormInterface> {
		return this.http.post<any>(`${environments}/data-form.json`, data).pipe(
			map((response: FbCreateResponse) => {
				return {
					...data,
					id: response.name,
					date: new Date(data.date),
				};
			}),
		);
	}

	public getAllDataForm(): Observable<DataFormInterface[]> {
		return this.http.get<DataFormInterface>(`${environments}/data-form.json`).pipe(
			map((response: { [key: string]: any }) => {
				return Object.keys(response).map((key) => ({
					...response[key],
					id: key,
					date: new Date(response[key].date),
				}));
			}),
		);
	}
}
