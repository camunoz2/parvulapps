import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { TERMS } from '../evaluar'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.term === TERMS[0].id) {
    console.log(req.body)

    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        firstTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === TERMS[1].id) {
    await prisma.objective.update({
      where: {
        id: req.body.objectiveId,
      },
      data: {
        secondTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === TERMS[2].id) {
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
