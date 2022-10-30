import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const obj = await prisma.objective.findMany({
      where: {
        parentCoreId: req.body.coreId,
      },
    })
    res.status(200).send(obj)
  } else res.status(400).send('Only accepts get request!')
}
