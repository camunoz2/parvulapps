import type { PrismaClient, Prisma, Grade } from '@prisma/client'

export async function createGrade(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  classroom: string,
  section: string
) {
  const student = await prisma.grade.create({
    data: {
      classroom: classroom,
      section: section,
    },
  })

  return student
}
