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

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl: string = `${HOST}/menu`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getListByModulo(id:string){
      return this.http.get<Imenu[]>(`${this.baseUrl}/list/${id}`);

  }

  getMenus() {
    return this.http.get<Menu[]>(`${this.baseUrl}/principales`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getModuloPorUsuario(id:string) {
    return this.http.get<ModuloUsuario[]>(`${this.baseUrl}/usuario/${id}`)
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
