import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean DB
  const dCategory = await prisma.category.deleteMany()
  console.log('deleted categories: ', dCategory)

  const dCore = await prisma.core.deleteMany()
  console.log('deleted cores: ', dCore)

  const dGrade = await prisma.grade.deleteMany()
  console.log('deleted grades: ', dGrade)

  const dStudent = await prisma.student.deleteMany()
  console.log('deleted students: ', dStudent)

  const dAccount = await prisma.account.deleteMany()
  console.log('deleted account: ', dAccount)

  const dSession = await prisma.session.deleteMany()
  console.log('deleted session: ', dSession)

  const dUser = await prisma.user.deleteMany()
  console.log('deleted user: ', dUser)

  const dVerification = await prisma.verificationToken.deleteMany()
  console.log('deleted verificationToken: ', dVerification)

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
