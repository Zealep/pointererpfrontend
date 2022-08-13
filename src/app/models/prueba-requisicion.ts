import { Datos } from './datos';
import { RequisicionPersonal } from './requisicion-personal';
export class PruebaRequisicion {

  idReqPerPrueba!:string
  idRequisicionPersonal!: RequisicionPersonal;
  idDatoTipoPrueba!: Datos
  pesoPrueba!: number
  estado!: string
  usCreacion!: string
  feCreacion!: Date
  ipCreacion!: string
  usModificacion!: string
  feModificacion!: Date
  ipModificacion!: string

}
