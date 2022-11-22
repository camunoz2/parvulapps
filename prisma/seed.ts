import { Prisma, PrismaClient, Student } from '@prisma/client'
import { generateCurriculumForStudent } from './seed-curriculum'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Clean DB
  const dStudent = await prisma.student.deleteMany()
  console.log('deleted students: ', dStudent)

  const dObjective = await prisma.objective.deleteMany()
  console.log('deleted objectives: ', dObjective)

  const dGrade = await prisma.grade.deleteMany()
  console.log('deleted grades: ', dGrade)

  const dCore = await prisma.core.deleteMany()
  console.log('deleted cores: ', dCore)

  const dCategory = await prisma.category.deleteMany()
  console.log('deleted categories: ', dCategory)

  // Create Grade
  const sala = await prisma.grade.create({
    data: {
      classroom: 'Sala Cuna',
      section: 'A',
      teacherId: process.env.MY_GOOGLE_ID,
    },
  })
  console.log('create grade: ', sala)
  const nt1A = await prisma.grade.create({
    data: {
      classroom: 'NT1',
      section: 'A',
      teacherId: process.env.MY_GOOGLE_ID,
    },
  })
  console.log('create grade: ', nt1A)
  const nt2A = await prisma.grade.create({
    data: {
      classroom: 'NT2',
      section: 'A',
      teacherId: process.env.MY_GOOGLE_ID,
    },
  })
  console.log('create grade: ', nt2A)

  // Create students
  for (let i = 0; i < 1; i++) {
    const student = await prisma.student.create({
      data: {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        rut: faker.random.numeric(9),
        Grade: {
          connect: {
            id: sala.id,
          },
        },
      },
    })
    console.log('create student: ', student)
  }
  for (let i = 0; i < 1; i++) {
    const student = await prisma.student.create({
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
    console.log('create student: ', student)
  }
  for (let i = 0; i < 1; i++) {
    const student = await prisma.student.create({
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
    console.log('create student: ', student)
  }

  // Create categories
  const categoryA = await prisma.category.create({
    data: {
      id: 1,
      description: 'Desarrollo Personal y Social',
    },
  })
  const categoryB = await prisma.category.create({
    data: {
      id: 2,
      description: 'Comunicación Integral',
    },
  })
  const categoryC = await prisma.category.create({
    data: {
      id: 3,
      description: 'Interacción y Comprensión del Entorno',
    },
  })
  console.log('created categories: ', categoryA, categoryB, categoryC)

  // Create cores

  const coreA = await prisma.core.create({
    data: {
      id: 1,
      description: 'Identidad y Autonomía',
      categoryId: 1,
    },
  })
  const coreB = await prisma.core.create({
    data: {
      id: 2,
      description: 'Convivencia y Ciudadanía',
      categoryId: 1,
    },
  })
  const coreC = await prisma.core.create({
    data: {
      id: 3,
      description: 'Corporalidad y Movimiento',
      categoryId: 1,
    },
  })

  const coreD = await prisma.core.create({
    data: {
      id: 4,
      description: 'Lenguaje Verbal',
      categoryId: 2,
    },
  })
  const coreE = await prisma.core.create({
    data: {
      id: 5,
      description: 'Lenguajes Artísticos',
      categoryId: 2,
    },
  })
  const coreF = await prisma.core.create({
    data: {
      id: 6,
      description: 'Exploración del Entorno Natural',
      categoryId: 2,
    },
  })
  const coreG = await prisma.core.create({
    data: {
      id: 7,
      description: 'Comprensión del Entorno Sociocultural',
      categoryId: 3,
    },
  })
  const coreH = await prisma.core.create({
    data: {
      id: 8,
      description: 'Pensamiento Matemático',
      categoryId: 3,
    },
  })

  console.log(
    'created cores: ',
    coreA,
    coreB,
    coreC,
    coreD,
    coreE,
    coreF,
    coreG,
    coreH
  )

  // Generate curriclum for every student
  const students = (await prisma.student.findMany()) as Student[]
  students.forEach((student) => {
    generateCurriculumForStudent(prisma, student.id)
  })
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
