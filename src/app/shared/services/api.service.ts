import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private snackBar: SnackBarComponent
  ) { }

  create$(name: string, model: any): Observable<any> {
    return this.http.post<any>(`/api/${name}`, model)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  get$(route: string): Observable<any> {
    return this.http.get<any>(route)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  getAll$(name: string): Observable<any[]> {
    return this.http.get<any>(`/api/${name}`)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  getById$(name: string, id: string): Observable<any> {
    return this.http.get<any>(`/api/${name}/${id}`)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  update$(name: string, id: string, model: any): Observable<any> {
    return this.http.put<any>(`/api/${name}/${id}`, model)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  delete$(name: string, id: string): Observable<any> {
    return this.http.delete<any>(`/api/${name}/${id}`)
      .pipe(map((res:ApiResponse) => this.prepareDefaultResponse(res)));
  }

  private prepareDefaultResponse(response: ApiResponse): any {
    const { success, data, message } = response;

    if (message) {
      this.snackBar.open(message, 'deal');
    }

    return data;
  }
}
