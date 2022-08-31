import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConsultaDocumentosElectronicosDTO } from '../../../models/dto/consulta-documentos-electronicos';
import { MatTableDataSource } from '@angular/material/table';
import { SelectService } from '../../../services/select.service';
import { Moneda } from '../../../models/moneda';
import { Persona } from '../../../models/persona';
import { Documento } from '../../../models/documento';
import { ConsultaValidezService } from '../../../services/consulta-validez.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConsultaValidezIn } from '../../../models/dto/consulta-validez-in';
import * as moment from 'moment';
import { SunatService } from '../../../services/sunat.service';
import { SpinnerOverlayService } from '../../../services/overlay.service';

@Component({
  selector: 'app-consulta-documentos-electronicos',
  templateUrl: './consulta-documentos-electronicos.component.html',
  styleUrls: ['./consulta-documentos-electronicos.component.css']
})
export class ConsultaDocumentosElectronicosComponent implements OnInit {

  estado!:string
  displayedColumns: string[] = ['proveedor', 'tipo', 'serie','numero','fechaEmision','moneda','total','estadoCp','estadoRuc','condDomiRuc','observaciones'];
  dataSource!: MatTableDataSource<ConsultaDocumentosElectronicosDTO>;
  bandejaConsultaValidez:ConsultaDocumentosElectronicosDTO[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  monedas:Moneda[] = []
  proveedores: Persona[] = []
  documentos: Documento[] = []


  checked = false;

  form: FormGroup = new FormGroup({
    fechaDesde: new FormControl(new Date()),
    fechaHasta: new FormControl(new Date()),
    ordenCompra: new FormControl(),
    tipoDocumento: new FormControl(),
    proveedor: new FormControl(),
    moneda: new FormControl()
  })


  constructor(private selectService:SelectService,
    private consultaValidezService:ConsultaValidezService,
    private sunatService:SunatService,
    private spinner:SpinnerOverlayService) { }

  ngOnInit(): void {
    this.getDocumentos()
    this.getProveedores()
    this.getMonedas()
    this.getBandeja()
  }

  getBandeja(){
    this.spinner.show()
    if(this.form.get('fechaDesde')?.value == null || this.form.get('fechaHasta')?.value == null){
      alert('Tiene que seleccionar las fechas')
      return;
    }


    if(this.form.get('fechaDesde')?.value != null || this.form.get('fechaHasta')?.value != null){
      if(this.form.get('fechaDesde')?.value == null || this.form.get('fechaHasta')?.value == null ){
        alert('Tiene que completar las dos fechas desde y hasta')
        return;
      }

      if(this.form.get('fechaDesde')?.value > this.form.get('fechaHasta')?.value){
          alert('La fecha desde no puede ser mayor a la fecha hasta')
          return
      }
    }

    let bandeja = new ConsultaValidezIn();

    let desde:Date = this.form.get('fechaDesde')?.value;
    let hasta:Date = this.form.get('fechaHasta')?.value;
    bandeja.fechaDesde = moment(desde).format('YYYY-MM-DD')
    bandeja.fechaHasta =  moment(hasta).format('YYYY-MM-DD')
    bandeja.ordenCompra = this.form.get('ordenCompra')?.value;
    bandeja.proveedor = this.form.get('proveedor')?.value;
    bandeja.moneda = this.form.get('moneda')?.value;
    bandeja.documento = this.form.get('tipoDocumento')?.value;


    this.consultaValidezService.list(bandeja)
    .subscribe(x=>{
      this.bandejaConsultaValidez = x;
      this.dataSource = new MatTableDataSource(this.bandejaConsultaValidez);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide()
    })

  }

  listSunat(){

    this.spinner.show()

    if(this.form.get('fechaDesde')?.value == null || this.form.get('fechaHasta')?.value == null){
      alert('Tiene que seleccionar las fechas')
      return;
    }


    if(this.form.get('fechaDesde')?.value != null || this.form.get('fechaHasta')?.value != null){
      if(this.form.get('fechaDesde')?.value == null || this.form.get('fechaHasta')?.value == null ){
        alert('Tiene que completar las dos fechas desde y hasta')
        return;
      }

      if(this.form.get('fechaDesde')?.value > this.form.get('fechaHasta')?.value){
          alert('La fecha desde no puede ser mayor a la fecha hasta')
          return
      }
    }

    let bandeja = new ConsultaValidezIn();

    let desde:Date = this.form.get('fechaDesde')?.value;
    let hasta:Date = this.form.get('fechaHasta')?.value;
    bandeja.fechaDesde = moment(desde).format('YYYY-MM-DD')
    bandeja.fechaHasta =  moment(hasta).format('YYYY-MM-DD')
    bandeja.ordenCompra = this.form.get('ordenCompra')?.value;
    bandeja.proveedor = this.form.get('proveedor')?.value;
    bandeja.moneda = this.form.get('moneda')?.value;
    bandeja.documento = this.form.get('tipoDocumento')?.value;

    this.consultaValidezService.listSunat(bandeja)
    .subscribe(x=>{
      this.bandejaConsultaValidez = x;
      this.dataSource = new MatTableDataSource(this.bandejaConsultaValidez);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide()
    })
  }

  getProveedores(){
    this.selectService.listProveedor()
    .subscribe(x=>{
      this.proveedores = x
    })
  }

  getMonedas(){
    this.selectService.listMonedas()
    .subscribe(x=>{
      this.monedas = x
    })
  }

  getDocumentos(){
    this.selectService.listDocumentos()
    .subscribe(x=>{
      this.documentos = x
    })
  }

  actualizar(){
    this.getBandeja()
  }

  consultaSunat(){

    this.listSunat();
  }


  limpiar(){
    this.form.reset()
  }


  getEstado(estado:string){

  }

}
