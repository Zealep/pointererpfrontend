import { Component, OnInit } from '@angular/core';
import { Imenu } from '../models/dto/IMenu';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { SelectService } from '../services/select.service';
import { AlertaOut } from '../models/dto/alerta-out';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})


export class PagesComponent implements OnInit {

  appitems: any;
  idModulo?: string
  nombreModulo?:string

  alertas: AlertaOut[] = []

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#303f9f',
    fontColor: 'white',
    backgroundColor: '#303f9f',
    selectedListFontColor: '#ff4081'
  };

  constructor(private menuService:MenuService,
    private router:Router,
    private selectService:SelectService) { }

  ngOnInit(): void {
    this.getAlertas();
  }

  getAlertas(){
    this.selectService.listAlertas(sessionStorage.getItem('usuario')!)
    .subscribe(x=>{
      this.alertas = x;
    })
  }

  getMenus(){
    this.menuService.getListByModulo(this.idModulo!).subscribe(x=>{
      this.appitems = x;
    })
  }

  selectedItem(event:any){
    console.log('event',event)
    this.router.navigate(['/pages'+event.link]);
  }

  onHeader(data:any){
      this.idModulo =data.id;
      this.nombreModulo = data.nombre;
      this.getMenus();
      console.log('items',this.appitems)
  }

}
