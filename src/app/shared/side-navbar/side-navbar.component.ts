import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { Imenu } from '../../models/dto/IMenu';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  menuList?: Observable<Imenu[]>;

  constructor(private menuService: MenuService) { }


  ngOnInit(): void {
  }

}
