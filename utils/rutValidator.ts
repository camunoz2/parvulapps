export function rutValidator(completeRut: string) {
  const MAX_RUT_VALUE = 99999999
  if (!/^[0-9]+-[0-9kK]{1}$/.test(completeRut)) return false

  const splitedRut = completeRut.split('-')
  let rutBeginning = parseInt(splitedRut[0], 10)
  let rutLast =
    splitedRut[1] === 'K' ? 'k' : parseInt(splitedRut[1], 10)

  if (rutBeginning > MAX_RUT_VALUE) return false

  // Set the isValid state variable based on the result of the RUT validation
  return rutLast === checkRutLastDigit(rutBeginning)
}

function checkRutLastDigit(digit: number): number | 'k' {
  let M = 0,
    S = 1

  for (; digit; digit = Math.floor(digit / 10)) {
    S = (S + (digit % 10) * (9 - (M++ % 6))) % 11
  }

  return S ? S - 1 : 'k'
}
