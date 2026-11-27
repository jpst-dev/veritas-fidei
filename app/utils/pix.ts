/**
 * "Pix copia e cola" estático (BR Code), no formato EMV do Manual de Padrões para
 * Iniciação do Pix, do Banco Central. Sem valor: quem doa escolhe quanto no app do banco.
 */

/** Campo EMV: id de dois dígitos, tamanho de dois dígitos, valor. */
function campo(id: string, valor: string) {
  return `${id}${String(valor.length).padStart(2, '0')}${valor}`
}

/** Nome e cidade só aceitam ASCII: tira acentos e caracteres fora do padrão, e corta no limite. */
function ascii(texto: string, limite: number) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 .\-]/g, '')
    .trim()
    .slice(0, limite)
}

/** CRC16-CCITT (polinômio 0x1021, início 0xFFFF), em hexadecimal maiúsculo com 4 dígitos. */
export function crc16(texto: string) {
  let crc = 0xffff
  for (const byte of new TextEncoder().encode(texto)) {
    crc ^= byte << 8
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function pixCopiaECola({ chave, nome, cidade, txid = '***' }: { chave: string; nome: string; cidade: string; txid?: string }) {
  const corpo =
    campo('00', '01') +
    campo('26', campo('00', 'br.gov.bcb.pix') + campo('01', chave.trim())) +
    campo('52', '0000') +
    campo('53', '986') +
    campo('58', 'BR') +
    campo('59', ascii(nome, 25) || 'N') +
    campo('60', ascii(cidade, 15) || 'BRASIL') +
    campo('62', campo('05', txid)) +
    '6304'
  return corpo + crc16(corpo)
}
