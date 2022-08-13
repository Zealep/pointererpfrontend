import { Areas } from './areas';
import { Datos } from './datos';
import { Cargo } from './cargo';
import { CentrosCosto } from './centros-costo';
import { DatosSunat } from './datos-sunat';

export class RequisicionPersonal{
  idRequisicionPersonal!:string
  idEmpresa!:string
  idDatoGrupoSeleccion!:Datos
  idDatoFormaCobertura!:Datos
  fechaSolicitud!:Date
  fechaPosibleIngreso!:Date
  idCargo!:Cargo
  numeroVacantes!:number
  sueldoPropuesto!:number
  indVisualizarSueldo!:string
  idDatoPaisTrabajo!:Datos
  idDpto!:string
  idProv!:string
  idDist!:string
  idCentroCostoSolicitante!:CentrosCosto
  idAreaSolicitante!:Areas
  idTrabajadorSolicitante!:string
  idDatoMotivoSolicitud!:Datos
  idDatoSunatCategoria!:DatosSunat
  idDatoSunatTipoContrato!:DatosSunat
  idTrabajadorAprobador!:string
  estAprobacion!:string
  fechaAprobacion!:Date
  indPublicarRequisicion!:string
  fechaDesdePublicacion!:Date
  fechaHastaPublicacion!:Date
  observaciones!:string
  estRequisicion!:string
  usCreacion!:string
  feCreacion!:Date
  ipCreacion!:string
}
