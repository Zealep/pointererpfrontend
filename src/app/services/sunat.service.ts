import { API_SUNAT_TOKEN, CLIENT_SUNAT_ID } from './../shared/var.constant';
import { Areas } from '../models/areas';
import { DatoArchivo } from '../models/dato-archivo';
import { catchError } from 'rxjs/operators';
import { HOST, API_SUNAT_GRANT_TYPE, API_SUNAT_SCOPE, CLIENT_SUNAT_SECRET } from '../shared/var.constant';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { GaleriaFoto } from '../models/galeria';
import { Noticia } from '../models/noticia';
import { Imenu } from '../models/dto/IMenu';
import { Menu } from '../models/menu';
import { ModuloUsuario } from '../models/dto/usuario-modulo';
import { SunatTokenResponse } from '../models/dto/sunat-token-response';
import { SunatValidacionRequest } from '../models/dto/sunat-validacion-request';
import { SunatValidacionResponse } from '../models/dto/sunat-validacion-response';

@Injectable({
  providedIn: 'root'
})
export class SunatService {

  private baseUrl: string = `${HOST}/sunat`;

  constructor(private http: HttpClient, private router: Router) {
  }

  validarComprobante(request:SunatValidacionRequest) {


    return this.http.post<SunatValidacionResponse>(`${this.baseUrl}/validarComprobante`,request)
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
