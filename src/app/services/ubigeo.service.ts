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
import { Ubigeo } from '../models/ubigeo';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private baseUrl: string = `${HOST}/ubigeo`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getById(id:string) {
    return this.http.get<Ubigeo>(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDepartamento() {
    return this.http.get<Ubigeo[]>(`${this.baseUrl}/departamentos`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getProvicia(departamento:string) {
    return this.http.get<Ubigeo[]>(`${this.baseUrl}/provincias/${departamento}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDistrito(departamento:string,provincia:string) {
    return this.http.get<Ubigeo[]>(`${this.baseUrl}/distritos/${departamento}/${provincia}`)
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
