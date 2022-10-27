import { PrismaClient, Prisma } from '@prisma/client'
import { cleanDB } from './clean-db'
import { createGrade } from './create-grade'
import { createIndicator } from './create-indicator'
import { createStudent } from './create-student'

const prisma = new PrismaClient()

async function main() {
  await cleanDB(prisma)

  const nt1a = await createGrade(prisma, 'NT1', 'A')
  const nt1b = await createGrade(prisma, 'NT1', 'B')
  const nt2a = await createGrade(prisma, 'NT2', 'A')
  const nt2b = await createGrade(prisma, 'NT2', 'B')

  const st1 = await createStudent(prisma, nt1a.id)
  const st2 = await createStudent(prisma, nt1a.id)
  const st3 = await createStudent(prisma, nt1a.id)
  const st4 = await createStudent(prisma, nt1b.id)
  const st5 = await createStudent(prisma, nt1b.id)
  const st6 = await createStudent(prisma, nt1b.id)
  const st7 = await createStudent(prisma, nt2a.id)
  const st8 = await createStudent(prisma, nt2a.id)
  const st9 = await createStudent(prisma, nt2a.id)
  const st10 = await createStudent(prisma, nt2b.id)
  const st11 = await createStudent(prisma, nt2b.id)
  const st12 = await createStudent(prisma, nt2b.id)

  const category = await prisma.category.create({
    data: {
      description: 'Interaccion y comprension del medio',
    },
  })

  const core = await prisma.core.create({
    data: {
      description: 'Exploración del entorno natural',
      categoryId: category.id,
    },
  })

  const obj = await prisma.objetive.create({
    data: {
      description:
        'Manifestar interés y asombro al ampliar información sobre cambios que ocurren en el entorno natural, a las personas, animales, plantas, lugares y cuerpos celestes, utilizando diversas fuentes y procedimientos',
      coreId: core.id,
    },
  })

  const ev = await prisma.evaluationTerm.create({
    data: {
      name: 'inicio',
    },
  })

  const ind1 = await createIndicator(
    prisma,
    'Explora el entorno, observando, manipulando y formulando preguntas sobre los cambios que ocurren en el entorno natural (personas, animales, plantas, lugares y cuerpos celestes).',
    4,
    ev.id,
    obj.id,
    st1.id
  )

  console.log(
    st1,
    st2,
    st3,
    st4,
    st5,
    st6,
    st7,
    st8,
    st9,
    st10,
    st11,
    st12
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
