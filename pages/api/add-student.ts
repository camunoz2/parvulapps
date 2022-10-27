import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.student.create({
    data: {
      name: req.body.firstName,
      lastName: req.body.lastName,
      rut: req.body.rut,
      grade: {
        connect: {
          classroom_section: {
            classroom: req.body.classroom,
            section: req.body.section,
          },
        },
      },
    },
  })

  res.status(200).end()
}
