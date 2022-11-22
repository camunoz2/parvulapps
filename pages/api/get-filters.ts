import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import prisma from '../../lib/prisma'
import { Curriculum } from '../../types/app'
import { authOptions } from './auth/[...nextauth]'

export default async function getFilters(
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
      const grade = await prisma.grade.findMany({
        where: {
          teacherId: user?.id,
        },
      })
      const cores = await prisma.core.findMany()
      const categories = await prisma.category.findMany()
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
