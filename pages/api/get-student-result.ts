import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import prisma from '../../lib/prisma'
import { authOptions } from './auth/[...nextauth]'

export default async function getStudentResult(
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
      const categories = await prisma.category.findMany()
      const cores = await prisma.core.findMany()
      const grades = await prisma.grade.findMany()
      const sum = await prisma.objective.groupBy({
        by: ['parentCoreId', 'studentId'],
        _sum: {
          firstTermScore: true,
          id: true,
        },
      })

      const students = await prisma.student.findMany({
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      })

      res
        .status(200)
        .json({ sum, students, categories, cores, grades })
    }
  } catch (error) {
    console.log(error)
  }
}
