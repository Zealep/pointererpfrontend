import { Component, OnInit } from '@angular/core';
import { UploadDocument } from '../../../models/dto/upload-document';
import { DatoArchivo } from '../../../models/dato-archivo';
import { UploadFileService } from '../../../services/upload-file.service';
import { GaleriaFoto } from '../../../models/galeria';
import { GaleriaService } from '../../../services/galeria.service';
import { PROCESO_GALERIA } from 'src/app/shared/var.constant';
import { ID_DOCUMENTO } from '../../../shared/var.constant';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerOverlayService } from '../../../services/overlay.service';

@Component({
  selector: 'app-galeria-fotos',
  templateUrl: './galeria-fotos.component.html',
  styleUrls: ['./galeria-fotos.component.css']
})
export class GaleriaFotosComponent implements OnInit {

  globalFilePrincipal?: File | null;
  globalFilesAnexos: File[] = [];
  globalDatoArchivo?: DatoArchivo | null;
  globalDatoArchivosAnexos: DatoArchivo[] = [];
  titulo: string = '';
  fecha?: Date;
  globalCodigoRelacional: string | undefined;
  formDataPrincipal?: FormData;
  formDataAnexos?: FormData

  constructor(private uploadService: UploadFileService,
    private galeriaService: GaleriaService,
    private router: Router,
    private readonly spinnerOverlayService: SpinnerOverlayService) { }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    const files = event.target.files;
    this.globalFilePrincipal = files[0];
    this.createPricipal(files[0]);
  }

  selectFiles(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.createAnexos(files[i]);
    }
  }


  uploadPrincipal(files: File, archivo: DatoArchivo, idCodigoRelacional:string) {
    console.log('principal files',files);
    console.log('principal archivos',archivo);

    const formData: FormData = new FormData();
    formData.append('file', files);
    formData.append('archivo', JSON.stringify(archivo));
    formData.append('codigo',idCodigoRelacional);
    this.formDataPrincipal = formData;
    //this.uploadService.upload(formData).subscribe(x => {});
  }

  uploadAnexos(files: File[], archivos: DatoArchivo[], idCodigoRelacional:string) {
    console.log('anexos files',files);
    console.log('anexos archivos',archivos);

    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('archivo', JSON.stringify(archivos));
    formData.append('codigo',idCodigoRelacional);
    this.formDataAnexos = formData;
    //this.uploadService.uploadList(formData).subscribe(x => {});
  }

  grabar() {
    this.spinnerOverlayService.show();
    let galeria = new GaleriaFoto();
    galeria.titulo = this.titulo;
    galeria.fecha = this.fecha;

    console.log('galeria',galeria);

    this.galeriaService.save(galeria).subscribe(x => {
      console.log('galeria save',x);
      this.uploadPrincipal(this.globalFilePrincipal!,this.globalDatoArchivo!,x.idEntity!);
      this.uploadAnexos(this.globalFilesAnexos,this.globalDatoArchivosAnexos, x.idEntity!)
   this.uploadService.upload(this.formDataPrincipal!).pipe(
    concatMap( x => this.uploadService.uploadList(this.formDataAnexos!))
   ).subscribe(result=>{
    this.spinnerOverlayService.hide();
    this.cancelar();
   })
    })
  }

  createPricipal(file:File){

    let archivo = new DatoArchivo();
    //archivo.idCodigoRelacional = this.globalCodigoRelacional;
    archivo.idProceso = PROCESO_GALERIA;
    archivo.idDocumento = ID_DOCUMENTO;
    archivo.inFotoPrincipal = 'S';
    archivo.nombreArchivo = file.name;
    this.globalDatoArchivo = archivo;
    this.globalFilePrincipal = file;
  }

  createAnexos(file: File) {

    let archivo = new DatoArchivo();
    //archivo.idCodigoRelacional = this.globalCodigoRelacional;
    archivo.idProceso = PROCESO_GALERIA;
    archivo.idDocumento = ID_DOCUMENTO;
    archivo.inFotoPrincipal = 'N';
    archivo.nombreArchivo = file.name;
    this.globalDatoArchivosAnexos.push(archivo);
    this.globalFilesAnexos.push(file);
  }

  delete(){
    this.globalFilePrincipal = null;
    this.globalDatoArchivo = null;
  }

deleteAnexos(index:number){
  this.globalDatoArchivosAnexos.splice(index,1);
  this.globalFilesAnexos.splice(index,1);
}

cancelar(){
  this.router.navigate(['/pages/galeria']);
}

}
