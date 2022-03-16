import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../../services/noticia.service';
import { Noticia } from '../../../models/noticia';
import { UploadFileService } from '../../../services/upload-file.service';
import { DatoArchivo } from '../../../models/dato-archivo';
import { PROCESO_GALERIA, PROCESO_NOTICIA, ID_DOCUMENTO } from '../../../shared/var.constant';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  img?: File | null;
  titulo: string = '';
  fecha?: Date;
  htmlContent: string = '';


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
    private router:Router) { }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    const file = event.target.files[0];
    this.img = file;
  }
  grabar() {

    let noticia = new Noticia();
    noticia.titulo = this.titulo;
    noticia.fecha = this.fecha;

    const formData: FormData = new FormData();
    formData.append('detalle', new Blob([this.htmlContent]));
    formData.append('noticia', JSON.stringify(noticia));
    console.log('save noticia', formData);

    this.noticiaService.save(formData).subscribe(x => {

      let archivo = new DatoArchivo();
      archivo.idProceso = PROCESO_NOTICIA;
      archivo.idDocumento = ID_DOCUMENTO;
      archivo.inFotoPrincipal = 'S';
      archivo.nombreArchivo = this.img?.name;

      const fileFormData: FormData = new FormData();
      fileFormData.append('file', this.img!);
      fileFormData.append('archivo', JSON.stringify(archivo));
      fileFormData.append('codigo', x.idEntity!);
      this.uploadService.upload(fileFormData).subscribe(y => {
        console.log('se guardo noticia con imagen')
        this.router.navigate(['/pages/noticia']);
      })
    })
  }

  delete(){
    this.img = null;
  }

  cancelar(){
    this.router.navigate(['/pages/noticia']);
  }

}
