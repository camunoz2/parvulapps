import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const deleteAllGrades = await prisma.grade.deleteMany()
  const deleteAllStudents = await prisma.student.deleteMany()

  const nt1 = await prisma.grade.create({
    data: {
      classroom: 'NT1',
      section: 'A',
      students: {
        createMany: {
          data: [
            {
              name: 'Yovanovich',
              lastName: 'Yussef',
              rut: '16729309',
            },
            {
              name: 'Mitranova',
              lastName: 'Kartus',
              rut: '16729309',
            },
            {
              name: 'Vladimir',
              lastName: 'V',
              rut: '3848374',
            },
          ],
        },
      },
    },
  })
  const nt2A = await prisma.grade.create({
    data: {
      classroom: 'NT2',
      section: 'A',
      students: {
        createMany: {
          data: [
            {
              name: 'Rick',
              lastName: 'Beato',
              rut: '34234-k',
            },
            {
              name: 'Dan',
              lastName: 'KAbramovartus',
              rut: '24987234-j',
            },
            {
              name: 'Katarina',
              lastName: 'Lospec',
              rut: 'asdasd4',
            },
          ],
        },
      },
    },
  })
  const nt2B = await prisma.grade.create({
    data: {
      classroom: 'NT2',
      section: 'B',
      students: {
        createMany: {
          data: [
            {
              name: 'Link',
              lastName: 'Zelda',
              rut: '126749348',
            },
            {
              name: 'Ryu',
              lastName: 'Ken',
              rut: '123434-9',
            },
            {
              name: 'Zangieff',
              lastName: 'Honda',
              rut: '9.283782-K',
            },
          ],
        },
      },
    },
  })

  console.log({ deleteAllGrades, deleteAllStudents, nt1, nt2A, nt2B })
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
