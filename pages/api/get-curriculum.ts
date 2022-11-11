import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { Curriculum } from '../../types/app'

export default async function getCurriculum(
  req: NextApiRequest,
  res: NextApiResponse<Curriculum>
) {
  try {
    if (req.method === 'GET') {
      const cat = await prisma.category.findMany()
      const cor = await prisma.core.findMany()
      const grade = await prisma.grade.findMany()
      res.status(200).json({
        categories: cat,
        cores: cor,
        grade,
      })
    } else res.status(400)
  } catch (e) {
    console.error(e)
  }
}
