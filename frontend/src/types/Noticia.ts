export interface Noticia {
  id: number
  titulo: string
  url: string
  autorNombre?: string
  dominio?: string
  nombreFuente?: string
  fuenteVerificada?: boolean
  tema?: string
  fechaPublicacion?: string
  scoreCredibilidad?: number
  totalVotos?: number
  votosVerdadero?: number
  votosFalso?: number
  votosDudoso?: number
  totalReposteos?: number
  yaExistia?: boolean
}
