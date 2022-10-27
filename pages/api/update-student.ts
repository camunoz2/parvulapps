import type { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.student.update({
    where: {
      id: req.body.id,
    },
    data: {
      name: req.body.firstName,
      lastName: req.body.lastName,
      rut: req.body.rut,
    },
  })

  res.status(200).end()
}
