import type { PrismaClient, Prisma } from '@prisma/client'

export async function createIndicator(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  desc: string,
  score: number,
  evaluationId: number,
  objetiveId: number,
  studentId: number
) {
  const indicator = await prisma.indicator.create({
    data: {
      description: desc,
      score: score,
      evaluationTermId: evaluationId,
      objetiveId: objetiveId,
      studentId: studentId,
    },
  })
}
