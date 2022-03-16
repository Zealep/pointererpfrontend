import { DatoArchivo } from './../models/dato-archivo';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl: string = `${HOST}/archivo`;

  constructor(private http: HttpClient, private router: Router) {
  }

  upload(formData: FormData){
    return this.http.post<ResponseApi>(`${this.baseUrl}/save`, formData
    )
    .pipe(
      catchError(this.handleError));
  }

  uploadList(formData: FormData){
    return this.http.post<ResponseApi>(`${this.baseUrl}/saveList`, formData
    )
    .pipe(
      catchError(this.handleError));
  }

  getFiles(id:string,proceso:string){
    return this.http.get<DatoArchivo[]>(`${this.baseUrl}/getByCodigoRelacional/${id}/${proceso}`);
  }


  download(path: string): Observable<Blob> {
    let parms = new HttpParams();
    parms = parms.append('url',path);
    return this.http.get(`${this.baseUrl}/getFile`,
      {
        params:parms,
        responseType: 'blob'
    });
  }

  deleteFile(path: string,id:string) {
    let parms = new HttpParams();
    parms = parms.append('url',path);
    parms = parms.append('id',id);
    return this.http.get<ResponseApi>(`${this.baseUrl}/deleteFile`,
    {
      params:parms
    }
  );
  }

  delete(path: string,id:string) {
    let parms = new HttpParams();
    parms = parms.append('url',path);
    parms = parms.append('id',id);
    return this.http.get<ResponseApi>(`${this.baseUrl}/delete`,
    {
      params:parms
    }
  );
  }


  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError(error);

  }
}
