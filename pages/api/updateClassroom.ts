import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { Prisma } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var updateStatus = await prisma.classroom.updateMany({
      where: {
        name: req.body.name,
      },
      data: {
        status: !req.body.status,
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.code)
    }
    throw e
  }

  res.status(200).send({ updateStatus })
}
