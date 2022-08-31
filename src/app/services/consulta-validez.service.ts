import { Areas } from '../models/areas';
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
import { Imenu } from '../models/dto/IMenu';
import { Menu } from '../models/menu';
import { ModuloUsuario } from '../models/dto/usuario-modulo';
import { ConsultaDocumentosElectronicosDTO } from '../models/dto/consulta-documentos-electronicos';
import { ConsultaValidezIn } from '../models/dto/consulta-validez-in';

@Injectable({
  providedIn: 'root'
})
export class ConsultaValidezService {

  private baseUrl: string = `${HOST}`;

  constructor(private http: HttpClient, private router: Router) {
  }

  list(c:ConsultaValidezIn) {
    return this.http.post<ConsultaDocumentosElectronicosDTO[]>(`${this.baseUrl}/bandejaConsultaValidez`,c)
    .pipe(
      catchError(this.handleError)
    );
  }

  listSunat(c:ConsultaValidezIn) {
    return this.http.post<ConsultaDocumentosElectronicosDTO[]>(`${this.baseUrl}/bandejaConsultaValidezSunat`,c)
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
    return throwError('Ocurrio un error en la peticion');

  }
}
