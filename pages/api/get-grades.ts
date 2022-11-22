import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import prisma from '../../lib/prisma'
import { authOptions } from './auth/[...nextauth]'

export default async function getGrades(
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

    const grades = await prisma.grade.findMany({
      where: {
        teacherId: user?.id,
      },
    })
    res.status(200).send(grades)
  } catch (error) {
    res.status(400).send(error)
  }
}
