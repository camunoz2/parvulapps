import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const deleteAll = await prisma.classroom.deleteMany()
  const nt1 = await prisma.classroom.create({
    data: {
      name: 'NT1',
      fantasyName: 'PreKinder',
      section: 'A',
    },
  })
  const nt2 = await prisma.classroom.create({
    data: {
      name: 'NT2',
      fantasyName: 'Kinder',
      section: 'A',
    },
  })
  console.log({ deleteAll, nt1, nt2 })
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
