import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GaleriaService } from '../../../../services/galeria.service';
import { DatoArchivo } from '../../../../models/dato-archivo';
import { PROCESO_GALERIA, ID_DOCUMENTO } from '../../../../shared/var.constant';
import { UploadFileService } from '../../../../services/upload-file.service';
import { GaleriaFoto } from '../../../../models/galeria';
import { SpinnerOverlayService } from '../../../../services/overlay.service';

@Component({
  selector: 'app-galeria-edit',
  templateUrl: './galeria-edit.component.html',
  styleUrls: ['./galeria-edit.component.css']
})
export class GaleriaEditComponent implements OnInit {

  globalFilePrincipal!: File | null;
  globalFilesAnexo!: File;
  globalDatoArchivo!: DatoArchivo;
  globalDatoArchivosAnexos: DatoArchivo[] = [];
  fotos: DatoArchivo[] = [];

  idGaleria!: string;
  titulo!: string;
  fecha!: Date;

  constructor(private router: Router,
    private galeriaService: GaleriaService,
    private route: ActivatedRoute,
    private uploadService: UploadFileService,
    private readonly spinnerOverlayService: SpinnerOverlayService) { }

  ngOnInit(): void {
    this.idGaleria = this.route.snapshot.paramMap.get("id")!;
    this.cargarDatos();
    this.cargarFotos();
  }

  cargarDatos() {
    this.galeriaService.getById(this.idGaleria).subscribe(x => {
      this.titulo = x.titulo!;
      this.fecha = x.fecha!;
    })
  }


  cargarFotos() {
    this.uploadService.getFiles(this.idGaleria, PROCESO_GALERIA)
      .subscribe(x => {
        for (let y of x) {
          if (y.inFotoPrincipal == 'S') {
            this.globalDatoArchivo = y;
          }
          else {
            this.globalDatoArchivosAnexos.push(y);
          }
        }
      })
  }

  selectFile(event: any) {
    const files = event.target.files;
    this.globalFilePrincipal = files[0];
    this.subirPrincipal();
  }

  selectFiles(event: any) {
    const files = event.target.files;
      this.globalFilesAnexo= files[0];
      this.subirAnexo();

  }


  delete(path:string, codigo: string) {
    this.uploadService.deleteFile(path,codigo).subscribe(x=>{
      console.log('archivo borrado')
      this.globalDatoArchivosAnexos = [];
      this.cargarFotos();
    })
  }

  subirPrincipal() {
    this.spinnerOverlayService.show();
    if (this.globalDatoArchivo != null) {
      this.borrarPrincial();
    }

    this.globalDatoArchivo.nombreArchivo = this.globalFilePrincipal!.name;

    const formData: FormData = new FormData();
    formData.append('file', this.globalFilePrincipal!);
    formData.append('archivo', JSON.stringify(this.globalDatoArchivo));
    formData.append('codigo', this.globalDatoArchivo.idCodigoRelacional!);


    this.uploadService.upload(formData).subscribe(x => {
      this.spinnerOverlayService.hide();
    })
  }

  borrarPrincial() {
    this.uploadService.delete(this.globalDatoArchivo.pathArchivo!, this.globalDatoArchivo.idCodigoRelacional!).subscribe(x => {
    })
  }

  subirAnexo() {
    this.spinnerOverlayService.show();
    let archivo = new DatoArchivo();
    //archivo.idCodigoRelacional = this.globalCodigoRelacional;
    archivo.idProceso = PROCESO_GALERIA;
    archivo.idDocumento = ID_DOCUMENTO;
    archivo.inFotoPrincipal = 'N';
    archivo.nombreArchivo = this.globalFilesAnexo.name;

    const formData: FormData = new FormData();
    formData.append('file', this.globalFilesAnexo);
    formData.append('archivo', JSON.stringify(archivo));
    formData.append('codigo', this.idGaleria!);

    this.uploadService.upload(formData).subscribe(x=>{
      console.log('anexo subido')
      this.globalFilePrincipal = null;
      this.globalDatoArchivosAnexos = [];
      this.cargarFotos();
      this.spinnerOverlayService.hide();
    })

  }


  editar() {
      let galeria = new GaleriaFoto();
      galeria.idGaleriaFoto = this.idGaleria;
      galeria.fecha = this.fecha;
      galeria.titulo = this.titulo;
      this.galeriaService.save(galeria)
      .subscribe(x=>{
        console.log('galeria actualizada')
        this.cancelar();
      })
  }

  cancelar() {
    this.router.navigate(['/pages/galeria']);
  }


}
