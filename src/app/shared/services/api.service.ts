import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

	create$(name: string, data: any) {
		return this.http.post<any>(`/api/${name}`, data)
			.pipe(map((response) => {
				const { success, data, message } = response;
				return data;
			}))
	}

	getAll(name: string) {
		return this.http.get<any>(`/api/${name}`)
			.pipe(map((response) => {
				const { success, data, message } = response;
				return data;
			}));
	}

	getById$(name: string, id: string | number) {
		return this.http.get<any>(`/api/${name}/${id}`)
			.pipe(map((response) => {
				const { success, data, message } = response;
				return data;
			}));
	}

	update(name: string, id: string, data: any) {
		return this.http.put<any>(`/api/${name}/${id}`, data)
    	.pipe(map((response) => {
				const { success, data, message } = response;
				return data;
			}));
	}
}
