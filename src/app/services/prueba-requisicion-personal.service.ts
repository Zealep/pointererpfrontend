import { DatoArchivo } from '../models/dato-archivo';
import { catchError } from 'rxjs/operators';
import { HOST } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { GaleriaFoto } from '../models/galeria';
import { Noticia } from '../models/noticia';
import { RequisicionPersonal } from '../models/requisicion-personal';
import { BandejaRequisicionRequestIn } from '../models/dto/bandeja-requisicion-in';
import { BandejaRequisicion } from '../models/dto/bandeja-requisicion';
import { PruebaRequisicion } from '../models/prueba-requisicion';

@Injectable({
  providedIn: 'root'
})
export class PruebaRequisicionPersonalService {

  private baseUrl: string = `${HOST}/pruebaRequisicion`;

  constructor(private http: HttpClient, private router: Router) {
  }

  save(r:RequisicionPersonal){
    return this.http.post<ResponseApi>(`${this.baseUrl}/save`, r
    )
    .pipe(
      catchError(this.handleError));
  }

  saveAll(formData:FormData){
    return this.http.post<ResponseApi>(`${this.baseUrl}/saveAll`,formData
    )
    .pipe(
      catchError(this.handleError));
  }

  getById(id:string){
    return this.http.get<PruebaRequisicion>(`${this.baseUrl}/find/${id}`);
  }

  getByIdRequisicion(id:string){
    return this.http.get<PruebaRequisicion[]>(`${this.baseUrl}/findByRequisicion/${id}`);
  }


  getList(){
    return this.http.get<PruebaRequisicion[]>(`${this.baseUrl}/list`);
  }

  delete(idReq: string) {
    return this.http.delete<ResponseApi>(`${this.baseUrl}/delete/${idReq}`)
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
