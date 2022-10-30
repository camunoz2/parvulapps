import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { TERMS } from '../evaluar'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.term === TERMS[0]) {
    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        firstTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === TERMS[1]) {
    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        secondTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === TERMS[2]) {
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
