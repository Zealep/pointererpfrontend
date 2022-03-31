import { MenuService } from './../../../services/menu.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu';
import { ModuloUsuario } from '../../../models/dto/usuario-modulo';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus:Menu[] = [];
  idUsuario?:string;
  username?:string;
  principales:ModuloUsuario[] = [];
   @Output() header = new EventEmitter<{id:string,nombre:string}>();

  constructor(private loginService:AuthenticationService,
  private authentocationService: AuthenticationService,
  private router: Router,
  private menuService: MenuService) {

}

ngOnInit() {
 this.idUsuario = sessionStorage.getItem("usuario")!;
 this.username = sessionStorage.getItem("username")!;
  this.getModuloPorUsuario();
}


getModuloPorUsuario(){
  this.menuService.getModuloPorUsuario(this.idUsuario!).subscribe(x=>{
      this.principales = x;
  })
}

cerrarSesion(){
  this.authentocationService.logOut();
  this.router.navigate(['login']);
}

enviarModulo(modulo:string,nombre:string){
  console.log('modulo',modulo);
  this.header.emit({id:modulo,nombre:nombre});
}


}
