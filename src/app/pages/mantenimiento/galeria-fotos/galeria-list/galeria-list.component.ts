import { Component, OnInit, ViewChild } from '@angular/core';
import { GaleriaFoto } from '../../../../models/galeria';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GaleriaService } from '../../../../services/galeria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel } from '../../../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-galeria-list',
  templateUrl: './galeria-list.component.html',
  styleUrls: ['./galeria-list.component.css']
})
export class GaleriaListComponent implements OnInit {

  list: GaleriaFoto[] = [];
  displayedColumns: string[] = ['titulo', 'fecha','acciones'];
  dataSource!: MatTableDataSource<GaleriaFoto>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private galeriaService: GaleriaService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

  private load(){
    this.galeriaService.getList().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(galeria: GaleriaFoto){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar la galeria',
        message: 'Deseas borrar la galeria?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(galeria);
        }
      });
  }

  private sendDeleteRequest(galeria: GaleriaFoto) {
    this.galeriaService.eliminarTodo(galeria.idGaleriaFoto!)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Galeria eliminada', 'Cerrar', {
        duration: 3000
      });
    });
  }
}
