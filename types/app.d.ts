import type { Objective, Category, Core } from '@prisma/client'

export interface CustomGrade {
  classroom: string | null
  section: string | null
}

export interface Curriculum {
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
}
