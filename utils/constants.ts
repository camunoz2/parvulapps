import { EvalTerms } from '../types/app'

export const MAX_SCORE = [0, 1, 2, 3, 4, 5]

// TODO: This depends on objective qty, best cache or harcoding the result
export const NUMBER_OF_OBJECTIVES = 206

export const CATEGORIES = [
  { id: 1, name: 'Desarrollo Personal y Social' },
  { id: 2, name: 'Comunicación Integral' },
  { id: 3, name: 'Interacción y Comprensión del Entorno' },
]

export const CORES = [
  { id: 1, name: 'Identidad y Autonomía' },
  { id: 2, name: 'Convivencia y Ciudadanía' },
  { id: 3, name: 'Corporalidad y Movimiento' },
  { id: 4, name: 'Lenguaje Verbal' },
  { id: 5, name: 'Lenguajes Artísticos' },
  { id: 6, name: 'Exploración del Entorno Natural' },
  { id: 7, name: 'Comprensión del Entorno Sociocultural' },
  { id: 8, name: 'Pensamiento Matemático' },
]

export const EVAL_TERMS: EvalTerms[] = [
  {
    name: 'Diagnóstica',
    id: 0,
    key: 'firstTermScore',
  },
  {
    name: 'Intermedia',
    id: 1,
    key: 'secondTermScore',
  },
  {
    name: 'Final',
    id: 2,
    key: 'thirdTermScore',
  },
]

export const TOTAL_OBJECTIVE_SCORE =
  NUMBER_OF_OBJECTIVES * MAX_SCORE[MAX_SCORE.length - 1]
