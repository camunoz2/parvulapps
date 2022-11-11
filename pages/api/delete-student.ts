import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function deleteStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await prisma.student.delete({
      where: {
        id: req.body.id,
      },
    })
  }

  res.status(200).end()
}
