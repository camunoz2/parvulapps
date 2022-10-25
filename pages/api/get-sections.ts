import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const nt1 = await prisma.classroom.findMany({
    where: {
      name: 'NT1',
    },
  })
  const nt2 = await prisma.classroom.findMany({
    where: {
      name: 'NT2',
    },
  })

  res.status(200).send({ nt1, nt2 })
}
