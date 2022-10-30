import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const obj = await prisma.objective.findMany({
      where: {
        studentId: req.body.studentId,
      },
    })
    res.status(200).json(obj)
  } catch (e) {
    console.error(e)
  }
}
