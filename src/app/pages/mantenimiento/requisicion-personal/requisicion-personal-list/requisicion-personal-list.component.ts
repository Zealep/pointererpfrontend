import { Component, OnInit, ViewChild } from '@angular/core';
import { RequisicionPersonal } from '../../../../models/requisicion-personal';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RequisicionPersonalService } from '../../../../services/requisicion-personal.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreasService } from '../../../../services/areas.service';
import { CargoService } from '../../../../services/cargo.service';
import { CentrosCostoService } from '../../../../services/centros-costo.service';
import { CentrosCosto } from '../../../../models/centros-costo';
import { Cargo } from '../../../../models/cargo';
import { Areas } from '../../../../models/areas';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../../../shared/models/confirm-dialog-model';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BandejaRequisicionRequestIn } from '../../../../models/dto/bandeja-requisicion-in';
import { BandejaRequisicion } from '../../../../models/dto/bandeja-requisicion';

@Component({
  selector: 'app-requisicion-personal-list',
  templateUrl: './requisicion-personal-list.component.html',
  styleUrls: ['./requisicion-personal-list.component.css']
})
export class RequisicionPersonalListComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'fechaSolicitud', 'cargo', 'estado','acciones'];
  dataSource!: MatTableDataSource<BandejaRequisicion>;
  requisiciones: BandejaRequisicion[] = [];
  areas: Areas[] = []
  cargos: Cargo[] = []
  centrosCostos: CentrosCosto[] = []

  form: FormGroup = new FormGroup({
    fechaDesde: new FormControl(),
    fechaHasta: new FormControl(),
    codigoRequisicion: new FormControl(),
    idCargo: new FormControl(),
    idCentroCostoSolicitante: new FormControl(),
    idAreaSolicitante: new FormControl()
  })

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private requisicionService: RequisicionPersonalService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private areasService: AreasService,
    private cargoService: CargoService,
    private centrosCostoService: CentrosCostoService,
    ) { }

  ngOnInit(): void {
    this.load()
    this.getAreas()
    this.getCargos()
    this.getCentrosCostos()

  }

  load(){

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

    let bandeja = new BandejaRequisicionRequestIn();

    bandeja.codigoRequisicion = this.form.get('codigoRequisicion')?.value;
    bandeja.idCargo = this.form.get('idCargo')?.value;
    bandeja.idCentroCostoSolicitante = this.form.get('idCentroCostoSolicitante')?.value;
    bandeja.idAreaSolicitante = this.form.get('idAreaSolicitante')?.value;
    bandeja.fechaSolicitudDesde = this.form.get('fechaDesde')?.value;
    bandeja.fechaSolicitudHasta = this.form.get('fechaHasta')?.value;


    this.requisicionService.bandeja(bandeja).subscribe(x=>{
      this.requisiciones = x;
      this.dataSource = new MatTableDataSource(this.requisiciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  delete(x: RequisicionPersonal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Cerrar requisicion de personal',
        message: 'Deseas cerrar la requisicion de personal?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(x);
        }
      });
  }

  private sendDeleteRequest(e: RequisicionPersonal) {
    this.requisicionService.cerrar(e.idRequisicionPersonal!)
    .pipe(catchError(error => {
      console.log('error',error)
      this.snackBar.open(error.error.message, "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
        panelClass:["error-style"]
      })
      return EMPTY}))
    .subscribe(response => {
      this.load();
      this.snackBar.open("Se cerro la requisicion del personal", "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass:["error-style"]
      })
    });
  }

  getEstado(estado:string){
    if(estado == 'A'){
      return 'ACTIVA'
    }
    else if(estado == 'C'){
      return 'CERRADA'
    }
    else{
      return 'DESIERTA'
    }
  }



  clear(){
    this.form.reset()
  }

getAreas() {
  this.areasService.list()
    .subscribe(x => {
      this.areas = x;
    })
}

getCargos() {
  this.cargoService.list()
    .subscribe(x => {
      this.cargos = x;
    })
}

getCentrosCostos() {
  this.centrosCostoService.list()
    .subscribe(x => {
      this.centrosCostos = x;
    })
}
}
