import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http: HttpClient) { }

  create(modelData) {
    return this.http.post<any>('/api/models',  modelData)
      .pipe(map((response) => {
        const { success, data, message } = response;
        console.log('ModelService#create', { response });
        return data;
      }));
  }
}
