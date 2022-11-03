import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const sum = await prisma.objective.groupBy({
      by: ['parentCoreId', 'studentId'],
      _sum: {
        firstTermScore: true,
        id: true,
      },
    })

    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
      },
    })

    res.status(200).send({ sum, students })
  }
}
