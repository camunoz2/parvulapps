import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function deleteSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await prisma.grade.delete({
      where: {
        id: req.body.gradeId,
      },
    })
  }

  res.status(200).end()
}
