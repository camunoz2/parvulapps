import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function removeSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.classroom.delete({
    where: {
      id: req.body.id,
    },
  })

  res.status(200).end()
}
