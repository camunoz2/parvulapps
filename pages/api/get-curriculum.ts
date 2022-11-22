import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function getCurriculum(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(
      req,
      res,
      authOptions
    )
    if (!session?.user?.email)
      return res
        .status(400)
        .send({ message: 'El usuario no tiene un email valido' })

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (req.method === 'GET') {
      const cat = await prisma.category.findMany()
      const cor = await prisma.core.findMany()
      const grade = await prisma.grade.findMany({
        where: {
          teacherId: user?.id,
        },
      })
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
