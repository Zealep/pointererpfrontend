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
import { RequerimientoMateriales } from '../models/requerimiento-materiales';
import { BandejaReqMaterialIn } from '../models/dto/bandeja-req-material-in copy';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoMaterialervice {

  private baseUrl: string = `${HOST}`;

  constructor(private http: HttpClient, private router: Router) {
  }

  save(r: RequerimientoMateriales) {
    return this.http.post<ResponseApi>(`${this.baseUrl}/save`, r
    )
      .pipe(
        catchError(this.handleError));
  }

  bandeja(r: BandejaReqMaterialIn) {
    return this.http.post<RequerimientoMateriales[]>(`${this.baseUrl}/bandejaReqMaterial`, r
    )
      .pipe(
        catchError(this.handleError));
  }

  getById(id: string) {
    return this.http.get<RequerimientoMateriales>(`${this.baseUrl}/find/${id}`);
  }

  getList() {
    return this.http.get<RequerimientoMateriales[]>(`${this.baseUrl}/list`);
  }

  cerrar(id: string) {
    return this.http.delete<ResponseApi>(`${this.baseUrl}/cerrar/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Ocurrio un error en la peticion');

  }
}
