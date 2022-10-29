import type { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'

export async function createStudent(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  grade: number
) {
  const student = await prisma.student.create({
    data: {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      rut: faker.random.numeric(9),
      Grade: {
        connect: {
          id: grade,
        },
      },
    },
  })

  return student
}
