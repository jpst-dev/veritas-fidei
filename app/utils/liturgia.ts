/**
 * Calendário litúrgico (rito romano, com as transferências usadas no Brasil)
 * reduzido ao que o site precisa: o tempo litúrgico, a semana e a cor do dia.
 */

export type TempoLiturgico = 'advento' | 'natal' | 'comum' | 'quaresma' | 'pascoa'
export type CorLiturgica = 'verde' | 'roxo' | 'branco' | 'vermelho'

export interface DiaLiturgico {
  tempo: TempoLiturgico
  /** Semana dentro do tempo (1ª, 2ª…). Ausente no Natal e no Tríduo/Cinzas. */
  semana?: number
  cor: CorLiturgica
  /** Rótulo curto para a interface, ex.: "Tempo Comum · 30ª semana". */
  rotulo: string
}

const DIA = 24 * 60 * 60 * 1000

/** Data "pura" (meia-noite UTC) para que fuso horário e horário de verão não interfiram na conta de dias. */
function data(ano: number, mes: number, dia: number): Date {
  return new Date(Date.UTC(ano, mes - 1, dia))
}

function somarDias(d: Date, dias: number): Date {
  return new Date(d.getTime() + dias * DIA)
}

function diasEntre(inicio: Date, fim: Date): number {
  return Math.round((fim.getTime() - inicio.getTime()) / DIA)
}

function domingoAteOuAntes(d: Date): Date {
  return somarDias(d, -d.getUTCDay())
}

/** Domingo de Páscoa (algoritmo anônimo gregoriano / Meeus-Jones-Butcher). */
export function pascoa(ano: number): Date {
  const a = ano % 19
  const b = Math.floor(ano / 100)
  const c = ano % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mes = Math.floor((h + l - 7 * m + 114) / 31)
  const dia = ((h + l - 7 * m + 114) % 31) + 1
  return data(ano, mes, dia)
}

/** 1º Domingo do Advento: o domingo entre 27/11 e 03/12. */
export function primeiroDomingoDoAdvento(ano: number): Date {
  return domingoAteOuAntes(data(ano, 12, 3))
}

/**
 * Batismo do Senhor no Brasil: a Epifania é celebrada no domingo entre 2 e 8 de janeiro;
 * o Batismo é no domingo seguinte, ou na segunda-feira seguinte se a Epifania cair em 7 ou 8.
 */
export function batismoDoSenhor(ano: number): Date {
  const epifania = domingoAteOuAntes(data(ano, 1, 8))
  return epifania.getUTCDate() >= 7 ? somarDias(epifania, 1) : somarDias(epifania, 7)
}

function ordinal(n: number): string {
  return `${n}ª semana`
}

export function diaLiturgico(hoje: Date = new Date()): DiaLiturgico {
  const d = data(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate())
  const ano = d.getUTCFullYear()

  const advento = primeiroDomingoDoAdvento(ano)
  const natal = data(ano, 12, 25)
  const batismo = batismoDoSenhor(ano)
  const domingoPascoa = pascoa(ano)
  const cinzas = somarDias(domingoPascoa, -46)
  const primeiroDomingoQuaresma = somarDias(domingoPascoa, -42)
  const ramos = somarDias(domingoPascoa, -7)
  const quintaSanta = somarDias(domingoPascoa, -3)
  const sextaSanta = somarDias(domingoPascoa, -2)
  const pentecostes = somarDias(domingoPascoa, 49)

  // Tempo do Natal: de 25/12 até o Batismo do Senhor (atravessa a virada do ano)
  if (d >= natal || d <= batismo) {
    return { tempo: 'natal', cor: 'branco', rotulo: 'Tempo do Natal' }
  }

  if (d >= advento) {
    const semana = Math.floor(diasEntre(advento, d) / 7) + 1
    return { tempo: 'advento', semana, cor: 'roxo', rotulo: `Advento · ${ordinal(semana)}` }
  }

  if (d >= cinzas && d < domingoPascoa) {
    if (d.getTime() === sextaSanta.getTime()) {
      return { tempo: 'quaresma', cor: 'vermelho', rotulo: 'Sexta-feira Santa' }
    }
    if (d >= quintaSanta) {
      return { tempo: 'quaresma', cor: 'branco', rotulo: 'Tríduo Pascal' }
    }
    if (d >= ramos) {
      const cor = d.getTime() === ramos.getTime() ? 'vermelho' : 'roxo'
      return { tempo: 'quaresma', cor, rotulo: 'Semana Santa' }
    }
    if (d < primeiroDomingoQuaresma) {
      return { tempo: 'quaresma', cor: 'roxo', rotulo: 'Quaresma · Cinzas' }
    }
    const semana = Math.floor(diasEntre(primeiroDomingoQuaresma, d) / 7) + 1
    return { tempo: 'quaresma', semana, cor: 'roxo', rotulo: `Quaresma · ${ordinal(semana)}` }
  }

  if (d >= domingoPascoa && d <= pentecostes) {
    if (d.getTime() === pentecostes.getTime()) {
      return { tempo: 'pascoa', cor: 'vermelho', rotulo: 'Pentecostes' }
    }
    const semana = Math.floor(diasEntre(domingoPascoa, d) / 7) + 1
    return { tempo: 'pascoa', semana, cor: 'branco', rotulo: `Tempo Pascal · ${ordinal(semana)}` }
  }

  // Tempo Comum, 1ª parte: do dia seguinte ao Batismo até a véspera das Cinzas
  if (d < cinzas) {
    const semana = Math.floor(diasEntre(domingoAteOuAntes(batismo), d) / 7) + 1
    return { tempo: 'comum', semana, cor: 'verde', rotulo: `Tempo Comum · ${ordinal(semana)}` }
  }

  // Tempo Comum, 2ª parte: conta-se para trás a partir de Cristo Rei (34ª semana)
  const cristoRei = somarDias(advento, -7)
  const semana = 34 - Math.floor(diasEntre(domingoAteOuAntes(d), cristoRei) / 7)
  return { tempo: 'comum', semana, cor: 'verde', rotulo: `Tempo Comum · ${ordinal(semana)}` }
}
