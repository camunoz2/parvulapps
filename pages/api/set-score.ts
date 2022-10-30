import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.term === 'Inicio') {
    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        firstTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === 'Intermedia') {
    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        secondTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === 'Final') {
    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        thirdTermScore: req.body.value,
      },
    })
  }

  res.status(200).end()
}
