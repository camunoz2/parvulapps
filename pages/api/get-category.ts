import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const cat = await prisma.category.findMany({})
    res.status(200).send(cat)
  } else res.status(400).send('Only accepts get request!')
}
