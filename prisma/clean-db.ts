import type { PrismaClient, Prisma } from '@prisma/client'

export async function cleanDB(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) {
  const a = await prisma.category.deleteMany({})
  const b = await prisma.core.deleteMany({})
  const c = await prisma.evaluationTerm.deleteMany({})
  const d = await prisma.grade.deleteMany({})
  const e = await prisma.indicator.deleteMany({})
  const f = await prisma.objetive.deleteMany({})
  const g = await prisma.student.deleteMany({})
  const h = await prisma.teacher.deleteMany({})

  console.log('deleted:', a, b, c, d, e, f, g, h)
}
