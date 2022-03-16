import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NoticiaService } from '../../../../services/noticia.service';
import { UploadFileService } from '../../../../services/upload-file.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Noticia } from '../../../../models/noticia';
import { PROCESO_NOTICIA, ID_DOCUMENTO } from '../../../../shared/var.constant';
import { DatoArchivo } from '../../../../models/dato-archivo';
import { SpinnerOverlayService } from '../../../../services/overlay.service';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: './noticia-edit.component.html',
  styleUrls: ['./noticia-edit.component.css']
})
export class NoticiaEditComponent implements OnInit {


  img?: File | null;
  titulo?: string | undefined;
  fecha?: Date;
  htmlContent?: string | undefined;
  idNoticia!: string | null;
  archivo!:DatoArchivo ;



  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Ingresa el detalle de la noticia ...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
      ],
      [

        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private noticiaService: NoticiaService,
    private uploadService: UploadFileService,
    private router:Router,
    private route:ActivatedRoute,
    private readonly spinnerOverlayService: SpinnerOverlayService) { }

  ngOnInit(): void {
    this.idNoticia = this.route.snapshot.paramMap.get('id');
    this.cargarDatos();
  }

  cargarDatos(){
    this.noticiaService.getById(this.idNoticia!)
    .subscribe(x =>{
      this.titulo = x.titulo;
      this.fecha = x.fecha;
      this.htmlContent = x.detalleHtml;
    })

    this.obtenerImagen();

  }

  obtenerImagen(){
    this.uploadService.getFiles(this.idNoticia!,PROCESO_NOTICIA).subscribe(x=>{
      for(let n of x){
        this.archivo = n;
      }

    })
  }

  selectFile(event: any) {
    const file = event.target.files[0];
    this.img = file;
    this.editarArchivo()

  }


  editar() {
    this.spinnerOverlayService.show();
    let noticia = new Noticia();
    noticia.idNoticia = this.idNoticia!;
    noticia.titulo = this.titulo;
    noticia.fecha = this.fecha;

    const formData: FormData = new FormData();
    formData.append('detalle', new Blob([this.htmlContent!]));
    formData.append('noticia', JSON.stringify(noticia));

    this.noticiaService.save(formData).subscribe(x => {
      this.spinnerOverlayService.hide();
      this.router.navigate(['/pages/noticia']);
    })

  }

  editarArchivo(){

    let archivo = new DatoArchivo();

    if(this.archivo != null){
      this.delete();
      archivo.idDatoArchivo = this.archivo.idDatoArchivo;
    }

    archivo.idCodigoRelacional = this.idNoticia!;
    archivo.idProceso = PROCESO_NOTICIA;
    archivo.idDocumento = ID_DOCUMENTO;
    archivo.inFotoPrincipal = 'S';
    archivo.nombreArchivo = this.img?.name;

    const fileFormData: FormData = new FormData();
    fileFormData.append('file', this.img!);
    fileFormData.append('archivo', JSON.stringify(archivo));
    fileFormData.append('codigo',  this.idNoticia!);
    this.uploadService.upload(fileFormData).subscribe(y => {
      this.obtenerImagen();
    })
  }


  delete(){
    this.uploadService.delete(this.archivo.pathArchivo!
      ,this.idNoticia!).subscribe(x=>{
        console.log('borrado')
      })
  }

  cancelar(){
    this.router.navigate(['/pages/noticia']);
  }

}
