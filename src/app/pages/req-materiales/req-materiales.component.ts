import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RequerimientoMateriales } from 'src/app/models/requerimiento-materiales';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RequerimientoMaterialervice } from '../../services/requerimiento-material.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BandejaReqMaterialIn } from 'src/app/models/dto/bandeja-req-material-in copy';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Estado } from 'src/app/models/dto/estados';

@Component({
  selector: 'app-req-materiales',
  templateUrl: './req-materiales.component.html',
  styleUrls: ['./req-materiales.component.css']
})
export class ReqMaterialesComponent implements OnInit {

  estados: Estado[] = [
    {
      id: 'GEN',
      nombre: 'Generado'
    },
    {
      id: 'PAP',
      nombre: 'Pre Aprobado'
    },
    {
      id: 'APR',
      nombre: 'Aprobado'
    },
    {
      id: 'ANU',
      nombre: 'Anulado'
    },
    {
      id: 'REC',
      nombre: 'Rechazado'
    },
    {
      id: 'ATN',
      nombre: 'Atendido'
    }

  ]

  displayedColumns: string[] = ['codigo', 'fechaEmision', 'solicitante', 'moneda', 'estado', 'campaña', 'operacion', 'observacion', 'total', 'tipo', 'prioridad'];
  dataSource!: MatTableDataSource<RequerimientoMateriales>;
  requisiciones: RequerimientoMateriales[] = [];

  form: FormGroup = new FormGroup({
    fechaDesde: new FormControl(),
    fechaHasta: new FormControl(),
    codigo: new FormControl(),
    prioridad: new FormControl(),
    estado: new FormControl(),

  })

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reqMaterialService: RequerimientoMaterialervice,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.load()
  }

  load() {

    if (this.form.get('fechaDesde')?.value != null || this.form.get('fechaHasta')?.value != null) {
      if (this.form.get('fechaDesde')?.value == null || this.form.get('fechaHasta')?.value == null) {
        alert('Tiene que completar las dos fechas desde y hasta')
        return;
      }

      if (this.form.get('fechaDesde')?.value > this.form.get('fechaHasta')?.value) {
        alert('La fecha desde no puede ser mayor a la fecha hasta')
        return
      }
    }
    console.log('estados', this.form.get('estado')?.value)
    let bandeja = new BandejaReqMaterialIn();

    bandeja.codigo = this.form.get('codigo')?.value;
    bandeja.prioridad = this.form.get('prioridad')?.value;
    bandeja.estado = this.form.get('estado')?.value;
    if (bandeja.estado) {
      bandeja.estado = bandeja.estado.toString()
    }

    console.log('bandeja', bandeja.estado)


    bandeja.fechaDesde = this.form.get('fechaDesde')?.value;
    bandeja.fechaHasta = this.form.get('fechaHasta')?.value;


    this.reqMaterialService.bandeja(bandeja).subscribe(x => {
      this.requisiciones = x;
      this.dataSource = new MatTableDataSource(this.requisiciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  delete(x: RequerimientoMateriales) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{

        title: 'Cerrar requerimiento de materiales',
        message: 'Deseas cerrar la requerimiento de requerimiento?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.sendDeleteRequest(x);
        }
      });
  }

  private sendDeleteRequest(e: RequerimientoMateriales) {
    this.reqMaterialService.cerrar(e.codigo!)
      .pipe(catchError(error => {
        console.log('error', error)
        this.snackBar.open(error.error.message, "X", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
          panelClass: ["error-style"]
        })
        return EMPTY
      }))
      .subscribe(response => {
        this.load();
        this.snackBar.open("Se cerro el requerimiento de material", "X", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ["error-style"]
        })
      });
  }

  getEstado(estado: string) {
    if (estado == 'A') {
      return 'ACTIVA'
    }
    else if (estado == 'C') {
      return 'CERRADA'
    }
    else {
      return 'DESIERTA'
    }
  }



  clear() {
    this.form.reset()
  }


}

