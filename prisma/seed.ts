import { Prisma, PrismaClient } from '@prisma/client'
import { generateCurriculum } from './seed-curriculum'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Clean DB
  await prisma.student.deleteMany()
  await prisma.grade.deleteMany()
  await prisma.studentScoresByObjective.deleteMany()
  await prisma.core.deleteMany()
  await prisma.category.deleteMany()
  await prisma.teacher.deleteMany()

  // Create Curriculum
  await generateCurriculum(prisma)

  // Create Grades
  const nt1A = await prisma.grade.create({
    data: {
      classroom: 'NT1',
      section: 'A',
    },
    select: {
      id: true,
    },
  })
  const nt1B = await prisma.grade.create({
    data: {
      classroom: 'NT1',
      section: 'B',
    },
    select: {
      id: true,
    },
  })
  const nt2A = await prisma.grade.create({
    data: {
      classroom: 'NT2',
      section: 'A',
    },
    select: {
      id: true,
    },
  })
  const nt2B = await prisma.grade.create({
    data: {
      classroom: 'NT2',
      section: 'B',
    },
    select: {
      id: true,
    },
  })

  // Create students

  for (let i = 0; i < 15; i++) {
    await prisma.student.create({
      data: {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        rut: faker.random.numeric(9),
        Grade: {
          connect: {
            id: nt1A.id,
          },
        },
      },
    })
  }
  for (let i = 0; i < 21; i++) {
    await prisma.student.create({
      data: {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        rut: faker.random.numeric(9),
        Grade: {
          connect: {
            id: nt1B.id,
          },
        },
      },
    })
  }
  for (let i = 0; i < 23; i++) {
    await prisma.student.create({
      data: {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        rut: faker.random.numeric(9),
        Grade: {
          connect: {
            id: nt2A.id,
          },
        },
      },
    })
  }
  for (let i = 0; i < 27; i++) {
    await prisma.student.create({
      data: {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        rut: faker.random.numeric(9),
        Grade: {
          connect: {
            id: nt2B.id,
          },
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect
  })
  .catch(async (e) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e)
    }
    await prisma.$disconnect()
    process.exit(1)
  })
