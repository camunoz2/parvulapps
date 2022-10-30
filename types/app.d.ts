import type { Objective, Category, Core } from '@prisma/client'

export interface CustomGrade {
  classroom: string | null
  section: string | null
}

export interface Curriculum {
  categories: Category[]
  cores: Core[]
}
