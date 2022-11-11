import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function getObjectives(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const obj = await prisma.objective.findMany({
      where: {
        studentId: req.body.studentId,
        parentCoreId: req.body.core,
      },
    })
    res.status(200).send(obj)
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}
