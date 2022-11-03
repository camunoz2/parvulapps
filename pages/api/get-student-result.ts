import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const nt1a = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
      },
      where: {
        Grade: {
          classroom: 'NT1',
          section: 'A',
        },
      },
    })

    const scoresByStudent = await prisma.objective.findMany({
      select: {
        studentId: true,
        firstTermScore: true,
        secondTermScore: true,
        thirdTermScore: true,
        parentCoreId: true,
        level: true,
      },
    })

    let studentsResults = []

    for (let i = 0; i < nt1a.length; i++) {
      studentsResults.push(
        scoresByStudent.filter(
          (item) => item.studentId === nt1a[i].id
        )
      )
      studentsResults.push({
        firstName: nt1a[i].name,
        lastName: nt1a[i].lastName,
      })
    }
  }

  res.status(200).send(studentsResults)
}
