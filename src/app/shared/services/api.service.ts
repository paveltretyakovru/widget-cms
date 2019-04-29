import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Observable } from 'rxjs';

export interface ApiOptionsInterface {
  params?: any;
}

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

  post$(route: string, data: any): Observable<any> {
    return this.http.post<any>(route, data)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  getAll$(name: string): Observable<any[]> {
    return this.http.get<any>(`/api/${name}`)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  getById$(name: string, id: string, options: ApiOptionsInterface = {}): Observable<any> {
    const preapredOptions = this.prepareHttpOptions(options);

    return this.http.get<any>(`/api/${name}/${id}`, preapredOptions)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  update$(name: string, id: string, model: any): Observable<any> {
    return this.http.put<any>(`/api/${name}/${id}`, model)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  delete$(name: string, id: string): Observable<any> {
    return this.http.delete<any>(`/api/${name}/${id}`)
      .pipe(map((res: ApiResponse) => this.prepareDefaultResponse(res)));
  }

  private prepareHttpOptions(options: ApiOptionsInterface) {
    const httpClientOptions: ApiOptionsInterface = {};

    if (options.params) {
      httpClientOptions.params = this.prepareHttpParams(options.params);
    }

    return httpClientOptions;
  }

  /**
   * Convert any params object to the HttpParams object to angular http requests
   * @param { Object } params
   * @returns { HttpParms } Object of HttpParams to make angular http requests
   */
  private prepareHttpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.keys(params).forEach((param: string) => {
      const strParam = String(params[param]);

      if (strParam) {
        httpParams = httpParams.append(param, strParam);
      }
    });

    return httpParams;
  }

  private prepareDefaultResponse(response: ApiResponse): any {
    const { success, data, message } = response;

    if (message) {
      this.snackBar.open(message, 'deal');
    }

    return data;
  }
}
