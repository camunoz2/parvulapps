import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { Curriculum } from '../../types/app'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Curriculum>
) => {
  try {
    //TODO: Validate data serveride with Zod
    //TODO: Status error handling 400, 500 etc
    if (req.method === 'GET') {
      const cat = await prisma.category.findMany()
      const cor = await prisma.core.findMany()
      res.status(200).json({
        categories: cat,
        cores: cor,
      })
    } else res.status(400)
  } catch (e) {
    console.error(e)
  }
}
