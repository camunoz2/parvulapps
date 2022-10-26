import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const grades = await prisma.grade.findMany({})

  res.status(200).send(grades)
}
