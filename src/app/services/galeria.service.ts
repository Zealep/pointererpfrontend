import { DatoArchivo } from '../models/dato-archivo';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { GaleriaFoto } from '../models/galeria';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private baseUrl: string = `${HOST}/galeria`;

  constructor(private http: HttpClient, private router: Router) {
  }

  save(galeria: GaleriaFoto){
    return this.http.post<ResponseApi>(`${this.baseUrl}/save`, galeria
    )
    .pipe(
      catchError(this.handleError));
  }

  getById(id:string){
    return this.http.get<GaleriaFoto>(`${this.baseUrl}/find/${id}`);
  }


  getList(){
    return this.http.get<GaleriaFoto[]>(`${this.baseUrl}/list`);

  }

  eliminar(id: string) {
    return this.http.delete<ResponseApi>(`${this.baseUrl}/delete/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminarTodo(id: string) {
    return this.http.delete<ResponseApi>(`${this.baseUrl}/deleteAll/${id}`)
    .pipe(
      catchError(this.handleError)
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
    return throwError('Usuario o clave invalidas');

  }
}
