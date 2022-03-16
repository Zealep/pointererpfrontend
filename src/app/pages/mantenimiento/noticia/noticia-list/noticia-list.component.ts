import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../../../models/noticia';
import { NoticiaService } from '../../../../services/noticia.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-noticia-list',
  templateUrl: './noticia-list.component.html',
  styleUrls: ['./noticia-list.component.css']
})
export class NoticiaListComponent implements OnInit {
  list: Noticia[] = [];
  displayedColumns: string[] = ['titulo', 'fecha','acciones'];
  dataSource!: MatTableDataSource<Noticia>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private noticiaService: NoticiaService,
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
    this.noticiaService.getList().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(noticia: Noticia){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar la noticia',
        message: 'Deseas borrar la noticia?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(noticia);
        }
      });
  }

  private sendDeleteRequest(noticia: Noticia) {
    this.noticiaService.eliminarTodo(noticia.idNoticia!)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Noticia eliminada', 'Cerrar', {
        duration: 3000
      });
    });
  }
}
