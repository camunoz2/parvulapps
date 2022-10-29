import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create Scores

  if (req.body.term === 'Inicio') {
    console.log(
      req.body.studentId,
      req.body.objectiveId,
      req.body.value
    )
    await prisma.studentScoresByObjective.create({
      data: {
        studentId: req.body.studentId,
        objectiveId: req.body.objectiveId,
        firstTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === 'Intermedia') {
    await prisma.studentScoresByObjective.create({
      data: {
        studentId: req.body.studentId,
        objectiveId: req.body.objectiveId,
        secondTermScore: req.body.value,
      },
    })
  }
  if (req.body.term === 'Final') {
    await prisma.studentScoresByObjective.create({
      data: {
        studentId: req.body.studentId,
        objectiveId: req.body.objectiveId,
        thirdTermScore: req.body.value,
      },
    })
  }

  res.status(200).end()
  // Update Scores
}
