import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function getStudentResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    res.status(200).json({ sum, students, categories, cores, grades })
  }
}
