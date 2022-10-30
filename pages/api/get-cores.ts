import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const cores = await prisma.core.findMany({
      where: {
        categoryId: req.body.categoryId,
      },
    })
    res.status(200).send(cores)
  }
}
