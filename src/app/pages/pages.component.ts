import { Component, OnInit } from '@angular/core';
import { Imenu } from '../models/dto/IMenu';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})


export class PagesComponent implements OnInit {

  appitems:any;

  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#3F51B5',
    fontColor: 'white',
    backgroundColor: '#3F51B5',
    selectedListFontColor: '#E040FB',
  };

  constructor(private menuService:MenuService,
    private router:Router) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(){
    this.menuService.getList().subscribe(x=>{
      console.log('items',x);
      this.appitems = x;
    })
  }

  selectedItem(event:any){
    console.log('event',event)
    this.router.navigate(['/pages'+event.link]);
  }

}
