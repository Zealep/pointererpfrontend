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
import { Persona } from '../models/persona';
import { Moneda } from '../models/moneda';
import { Documento } from '../models/documento';
import { AlertaOut } from '../models/dto/alerta-out';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  private baseUrl: string = `${HOST}/select`;

  constructor(private http: HttpClient, private router: Router) {
  }

  listProveedor() {
    return this.http.get<Persona[]>(`${this.baseUrl}/proveedor`)
    .pipe(
      catchError(this.handleError)
    );
  }

  listMonedas() {
    return this.http.get<Moneda[]>(`${this.baseUrl}/moneda`)
    .pipe(
      catchError(this.handleError)
    );
  }

  listDocumentos() {
    return this.http.get<Documento[]>(`${this.baseUrl}/documento`)
    .pipe(
      catchError(this.handleError)
    );
  }

  listAlertas(id:string) {
    return this.http.get<AlertaOut[]>(`${this.baseUrl}/alertas/${id}`)
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
