import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { CargoService } from '../../../services/cargo.service';
import { CentrosCostoService } from '../../../services/centros-costo.service';
import { DatosService } from '../../../services/datos.service';
import { DatosSunatService } from '../../../services/datos-sunat.service';
import { UbigeoService } from '../../../services/ubigeo.service';
import { RequisicionPersonalService } from '../../../services/requisicion-personal.service';
import { Areas } from 'src/app/models/areas';
import { Cargo } from '../../../models/cargo';
import { CentrosCosto } from '../../../models/centros-costo';
import { Datos } from '../../../models/datos';
import { DatosSunat } from '../../../models/datos-sunat';
import { FormGroup, FormControl } from '@angular/forms';
import { TrabajadorService } from '../../../services/trabajador.service';
import { Trabajador } from '../../../models/trabajador';
import { Ubigeo } from '../../../models/ubigeo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RequisicionPersonal } from '../../../models/requisicion-personal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { PruebaRequisicion } from '../../../models/prueba-requisicion';
import { MatTableDataSource } from '@angular/material/table';
import { PruebaRequisicionPersonalService } from '../../../services/prueba-requisicion-personal.service';
import { SpinnerOverlayService } from '../../../services/overlay.service';

@Component({
  selector: 'app-requisicion-personal',
  templateUrl: './requisicion-personal.component.html',
  styleUrls: ['./requisicion-personal.component.css']
})
export class RequisicionPersonalComponent implements OnInit {

  displayedColumns: string[] = ['prueba', 'peso','acciones'];
  dataSource!: MatTableDataSource<PruebaRequisicion>;
  esEdicion:boolean = false;

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 15;
  public color: ThemePalette = 'primary';
  public defaultTime = [9, 0 , 0]

  form: FormGroup = new FormGroup({
    idDatoGrupoSeleccion: new FormControl(''),
    idDatoFormaCobertura: new FormControl(''),
    fechaSolicitud: new FormControl(''),
    fechaPosibleIngreso: new FormControl(''),
    idCargo: new FormControl(''),
    numeroVacantes: new FormControl(''),
    sueldoPropuesto: new FormControl(''),
    indVisualizarSueldo: new FormControl(''),
    idDatoPaisTrabajo: new FormControl(''),
    idDpto: new FormControl(''),
    idProv: new FormControl(''),
    idDist: new FormControl(''),
    idCentroCostoSolicitante: new FormControl(''),
    idAreaSolicitante: new FormControl(''),
    idTrabajadorSolicitante: new FormControl(''),
    idDatoMotivoSolicitud: new FormControl(''),
    idDatoSunatCategoria: new FormControl(''),
    idDatoSunatTipoContrato: new FormControl(''),
    idTrabajadorAprobador: new FormControl(''),
    estAprobacion: new FormControl(''),
    fechaAprobacion: new FormControl(''),
    indPublicarRequisicion: new FormControl(''),
    fechaDesdePublicacion: new FormControl(''),
    fechaHastaPublicacion: new FormControl(''),
    observaciones: new FormControl(''),
    estRequisicion: new FormControl(''),
  });

  idRequisicionPersonal!:string | null
  areas: Areas[] = []
  cargos: Cargo[] = []
  centrosCostos: CentrosCosto[] = []
  gruposSeleccion: Datos[] = []
  formasCobertura: Datos[] = []
  paisTrabajo: Datos[] = []
  motivosSolicitud: Datos[] = []
  sunatCategorias: DatosSunat[] = []
  sunatTipoContratos: DatosSunat[] = []
  trabajadores: Trabajador[] = []
  departamentos: Ubigeo[] = [];
  provincias: Ubigeo[] = [];
  distritos: Ubigeo[] = [];

  tiposPruebas: Datos[] = []
  pruebasRequisicion: PruebaRequisicion[] = []
  idPrueba!:Datos | null;
  pesoPrueba!:number | null;

  constructor(private areasService: AreasService,
    private cargoService: CargoService,
    private centrosCostoService: CentrosCostoService,
    private datosService: DatosService,
    private datosSunatService: DatosSunatService,
    private ubigeoService: UbigeoService,
    private requisicionService: RequisicionPersonalService,
    private trabajadorService: TrabajadorService,
    private snackBar:MatSnackBar,
    private router:Router,
    private route: ActivatedRoute,
    private pruebaRequisicionPersonalService:PruebaRequisicionPersonalService,
    private spinnerOverlayService:SpinnerOverlayService) { }

  ngOnInit(): void {
    this.idRequisicionPersonal = this.route.snapshot.paramMap.get('id')!;

    this.getAreas()
    this.getCargos()
    this.getCentrosCostos()
    this.getGruposSeleccion()
    this.getFormaCobertura()
    this.getPaisesTrabajo()
    this.getMotivosSolicitud()
    this.getSunatCategorias()
    this.getTrabajadores()
    this.getDepartamentos();
    this.getTiposPrueba()
    this.initEditForm()
  }

getTiposPrueba(){
  this.datosService.listByTipoDato('TP')
  .subscribe(x=>{
    this.tiposPruebas = x
  })
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

  getGruposSeleccion() {
    this.datosService.listByTipoDato('GS')
      .subscribe(x => {
        this.gruposSeleccion = x;
      })
  }

  getFormaCobertura() {
    this.datosService.listByTipoDato('FC')
      .subscribe(x => {
        this.formasCobertura = x;
      })
  }


  getPaisesTrabajo() {
    this.datosService.listByTipoDato('02')
      .subscribe(x => {
        this.paisTrabajo = x;
      })
  }

  getMotivosSolicitud() {
    this.datosService.listByTipoDato('MS')
      .subscribe(x => {
        this.motivosSolicitud = x;
      })
  }

  getSunatCategorias() {
    this.datosSunatService.listByGrupo('46')
      .subscribe(x => {
        this.sunatCategorias = x;
      })
  }



  getTrabajadores() {
    this.trabajadorService.list()
      .subscribe(x => {
        this.trabajadores = x
      })
  }

  getDepartamentos() {
    this.ubigeoService.getDepartamento()
      .subscribe(x => {
        this.departamentos = x;
      })
  }

  getProvincias(dep: string) {
    this.ubigeoService.getProvicia(dep)
      .subscribe(x => {
        this.provincias = x;
      })
  }

  getDistritos(dep: string, prov: string) {
    this.ubigeoService.getDistrito(dep, prov)
      .subscribe(x => {
        this.distritos = x;
      })
  }

  onSelectDepartamento(event: string) {
    const  idDpto  = event.substring(0,2);
    this.getProvincias(idDpto);
  }

  onSelectProvincia(event: string) {
    const  idDpto  = event.substring(0,2);
    const  idProv  = event.substring(2,4);

    this.getDistritos(idDpto, idProv);
  }

  onSelectCategoria(event:any){
    if(event == '460001'){
      this.datosSunatService.listByGrupo('19').subscribe(x=>{
        this.sunatTipoContratos = x;
      })
    }
    else{
      this.datosSunatService.listByGrupo('47').subscribe(x=>{
        this.sunatTipoContratos = x;
      })
    }

  }


  initEditForm(){

    if(this.idRequisicionPersonal!=null){
      this.esEdicion = true;

      this.cargarTiposPruebas();
      this.desabilitar()
      this.requisicionService.getById(this.idRequisicionPersonal).subscribe(c =>{
        this.form.controls['idDatoGrupoSeleccion'].setValue(c.idDatoGrupoSeleccion.idDato);
        this.form.controls['idDatoFormaCobertura'].setValue(c.idDatoFormaCobertura.idDato);
        this.form.controls['fechaSolicitud'].setValue(c.fechaSolicitud);
        this.form.controls['fechaPosibleIngreso'].setValue(c.fechaPosibleIngreso);
        this.form.controls['idCargo'].setValue(c.idCargo.idCargo);
        this.form.controls['numeroVacantes'].setValue(c.numeroVacantes);
        this.form.controls['sueldoPropuesto'].setValue(c.sueldoPropuesto);
        this.form.controls['indVisualizarSueldo'].setValue(c.indVisualizarSueldo);
        this.form.controls['idDatoPaisTrabajo'].setValue(c.idDatoPaisTrabajo.idDato);
        this.cargarUbigeoActual(c);
        this.form.controls['idCentroCostoSolicitante'].setValue(c.idCentroCostoSolicitante.idCentroCosto);
        this.form.controls['idAreaSolicitante'].setValue(c.idAreaSolicitante.idArea);
        this.form.controls['idTrabajadorSolicitante'].setValue(c.idTrabajadorSolicitante);
        this.form.controls['idDatoMotivoSolicitud'].setValue(c.idDatoMotivoSolicitud.idDato);
        this.form.controls['idDatoSunatCategoria'].setValue(c.idDatoSunatCategoria.idDato);
        this.form.controls['idDatoSunatTipoContrato'].setValue(c.idDatoSunatTipoContrato.idDato);
        this.form.controls['idTrabajadorAprobador'].setValue(c.idTrabajadorAprobador);
        this.form.controls['estAprobacion'].setValue(c.estAprobacion);
        this.form.controls['fechaAprobacion'].setValue(c.fechaAprobacion);
        this.form.controls['indPublicarRequisicion'].setValue(c.indPublicarRequisicion);
        this.form.controls['fechaDesdePublicacion'].setValue(new Date(c.fechaDesdePublicacion));
        this.form.controls['fechaHastaPublicacion'].setValue(new Date(c.fechaHastaPublicacion));
        this.form.controls['observaciones'].setValue(c.observaciones);
        this.form.controls['estRequisicion'].setValue(c.estRequisicion);
      });
    }

}

  desabilitar(){
    this.form.controls['fechaSolicitud'].disable()
    this.form.controls['idTrabajadorSolicitante'].disable()
    this.form.controls['idTrabajadorAprobador'].disable()
  }

  cargarTiposPruebas(){
    this.pruebaRequisicionPersonalService.getByIdRequisicion(this.idRequisicionPersonal!)
    .subscribe(x=>{
      console.log('x',x)
      this.pruebasRequisicion = x;
      this.refreshDataSource()
    })
  }

  cargarUbigeoActual(c: RequisicionPersonal){


    this.ubigeoService.getById(c.idDpto+"00"+"00").
    subscribe(x=>{
      this.form.controls['idDpto'].setValue(x.idDistrito);
    })

    this.ubigeoService.getById(c.idDpto+c.idProv+"00").
    subscribe(x=>{
      this.form.controls['idProv'].setValue(x.idDistrito);
    })

    this.ubigeoService.getById(c.idDpto+c.idProv+c.idDist).
    subscribe(x=>{

      this.form.controls['idDist'].setValue(x.idDistrito);
    })


  }

  grabar() {

    this.spinnerOverlayService.show();

    let total = 0;
    console.log(this.dataSource)

      if(this.dataSource != null || this.dataSource != undefined){
        total = this.dataSource.data.reduce((summ, v) => summ += v.pesoPrueba!, 0);
      }

    if(total != 100){
      this.snackBar.open('El total del peso de las pruebas tiene q tener el 100%', "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass:["error-style"]
      })
      return;
    }


    const requisicion = new RequisicionPersonal();
    const datoGrupoSeleccion = new Datos();
    const datoFormaCobertura = new Datos();
    const cargo = new Cargo();
    const datoPaisTrabajo = new Datos();
    const centroCostoSolicitante = new CentrosCosto();
    const areaSolicitante = new Areas();
    const datoMotivoSolicitud = new Datos();
    const datoSunatCategoria = new DatosSunat()
    const datoSunatTipoContrato = new DatosSunat()

    if(this.idRequisicionPersonal != null){
      requisicion.idRequisicionPersonal = this.idRequisicionPersonal;
    }

    datoGrupoSeleccion.idDato = this.form.get('idDatoGrupoSeleccion')?.value;
    requisicion.idDatoGrupoSeleccion = datoGrupoSeleccion;

    datoFormaCobertura.idDato = this.form.get('idDatoFormaCobertura')?.value;
    requisicion.idDatoFormaCobertura = datoFormaCobertura;

    cargo.idCargo = this.form.get('idCargo')?.value;
    requisicion.idCargo = cargo;

    datoPaisTrabajo.idDato = this.form.get('idDatoPaisTrabajo')?.value;
    requisicion.idDatoPaisTrabajo = datoPaisTrabajo;

    centroCostoSolicitante.idCentroCosto = this.form.get('idCentroCostoSolicitante')?.value;
    requisicion.idCentroCostoSolicitante = centroCostoSolicitante;

    areaSolicitante.idArea = this.form.get('idAreaSolicitante')?.value;
    requisicion.idAreaSolicitante = areaSolicitante;

    datoMotivoSolicitud.idDato = this.form.get('idDatoMotivoSolicitud')?.value;
    requisicion.idDatoMotivoSolicitud = datoMotivoSolicitud;

    datoSunatCategoria.idDato = this.form.get('idDatoSunatCategoria')?.value;
    requisicion.idDatoSunatCategoria = datoSunatCategoria;

    datoSunatTipoContrato.idDato = this.form.get('idDatoSunatTipoContrato')?.value;
    requisicion.idDatoSunatTipoContrato = datoSunatTipoContrato;

    requisicion.fechaSolicitud = this.form.get('fechaSolicitud')?.value;
    requisicion.fechaPosibleIngreso = this.form.get('fechaPosibleIngreso')?.value;
    requisicion.numeroVacantes = this.form.get('numeroVacantes')?.value;
    requisicion.sueldoPropuesto = this.form.get('sueldoPropuesto')?.value;
    requisicion.indVisualizarSueldo = this.form.get('indVisualizarSueldo')?.value;

    const idDpto =   this.form.get('idDpto')?.value;
    const idProv =   this.form.get('idProv')?.value;
    const idDist =   this.form.get('idDist')?.value;

    requisicion.idDpto = idDpto.substring(0,2);
    requisicion.idProv = idProv.substring(2,4);
    requisicion.idDist = idDist.substring(4,6);
    requisicion.idTrabajadorSolicitante = this.form.get('idTrabajadorSolicitante')?.value;
    requisicion.idTrabajadorAprobador= this.form.get('idTrabajadorAprobador')?.value;
    requisicion.estAprobacion = this.form.get('estAprobacion')?.value;
    requisicion.fechaAprobacion = this.form.get('fechaAprobacion')?.value;
    requisicion.indPublicarRequisicion = this.form.get('indPublicarRequisicion')?.value;
    requisicion.fechaDesdePublicacion = this.form.get('fechaDesdePublicacion')?.value;
    requisicion.fechaHastaPublicacion = this.form.get('fechaHastaPublicacion')?.value;
    requisicion.observaciones = this.form.get('observaciones')?.value;
    requisicion.estRequisicion = this.form.get('estRequisicion')?.value;
    requisicion.usCreacion = sessionStorage.getItem("username")!;
    requisicion.feCreacion = new Date();
    requisicion.ipCreacion = '127.0.0.1'


    this.requisicionService.save(requisicion)
    .subscribe(x=>{
      this.guardarPruebas(x.idEntity!)
      this.snackBar.open('Se proceso el registro de requisicion de personal correctamente', "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass:["ok-style"]
      })
      this.spinnerOverlayService.hide();

      this.router.navigate(['/pages/bandejaRequisicion']);
    })


  }

  guardarPruebas(r:string){
    this.pruebasRequisicion.map(x=>{
      let re = new RequisicionPersonal
      re.idRequisicionPersonal = r;
      return x.idRequisicionPersonal = re
    })

    const formData: FormData = new FormData();
    formData.append('pruebas', JSON.stringify(this.pruebasRequisicion));

    this.pruebaRequisicionPersonalService.saveAll(formData)
    .subscribe(x=>{
      console.log('se guardo las pruebas')
    })

  }

  cancelar() {
    this.router.navigate(['/pages/bandejaRequisicion']);
  }

  agregarPrueba(){
    console.log('id',this.idPrueba!)
    console.log('peso',this.pesoPrueba!)
    let pruebaRequisicion = new PruebaRequisicion()

    pruebaRequisicion.idDatoTipoPrueba =  this.idPrueba!;
    pruebaRequisicion.pesoPrueba = this.pesoPrueba!
    pruebaRequisicion.usCreacion = sessionStorage.getItem("username")!;
    pruebaRequisicion.feCreacion = new Date();
    pruebaRequisicion.ipCreacion = '127.0.0.1'


    if(!this.validAgregarPrueba(pruebaRequisicion)){

      this.pruebasRequisicion.push(pruebaRequisicion)
      this.refreshDataSource();
      this.clear()
    }
    else{
      this.snackBar.open('Completa los datos obligatorios de la prueba', "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass:["error-style"]
      })
    }

  }

  validAgregarPrueba(det: PruebaRequisicion): boolean{
    return (det.idDatoTipoPrueba==null || det.pesoPrueba==null)

  }

  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.pruebasRequisicion);
  }

  clear(){
    this.idPrueba = null;
    this.pesoPrueba = null;
  }

  borrarPrueba(index:number,element:PruebaRequisicion){
    this.pruebasRequisicion.splice(index, 1);

    if(this.esEdicion){
      this.pruebaRequisicionPersonalService.delete(element.idReqPerPrueba)
      .subscribe(x=>{
        console.log("se borro fisicamente prueba")
      })
    }

    this.refreshDataSource();
  }

}
