import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { Curriculum } from '../../types/app'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Curriculum>
) => {
  try {
    if (req.method === 'GET') {
      const grade = await prisma.grade.findMany()
      const categories = await prisma.category.findMany()
      const cores = await prisma.core.findMany()
      res.status(200).json({
        grade: grade,
        categories: categories,
        cores: cores,
      })
    } else res.status(400)
  } catch (e) {
    console.error(e)
  }
}
