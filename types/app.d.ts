import type { Objective, Category, Core, Grade } from '@prisma/client'

export interface Curriculum {
  grade: Grade[]
  categories: Category[]
  cores: Core[]
}

export interface Response {
  sum: Sum2[]
  students: Student[]
}

interface Student {
  id: number
  name: string
  lastName: string
}

interface Sum2 {
  _sum: Sum
  studentId: number
  parentCoreId: number
}

interface Sum {
  firstTermScore: number
  id: number
}

export interface Filter {
  grade: Grade
  evalType: string
  categories: string
  core: string
}
