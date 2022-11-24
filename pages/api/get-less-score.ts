import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function getGrades(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const scores = await prisma.objective.groupBy({
        by: ['parentCoreId'],
        where: {
          studentId: req.body.studentId,
        },
        _sum: {
          firstTermScore: true,
          secondTermScore: true,
          thirdTermScore: true,
        },
      })

      res.status(200).send(scores)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}
