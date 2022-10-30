import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const students = await prisma.student.findMany()
    res.status(200).send(students)
  }

  if (req.method === 'POST') {
    console.log(req.body.classroom, req.body.section)
    const filteredStudents = await prisma.student.findMany({
      where: {
        Grade: {
          classroom: req.body.classroom,
          section: req.body.section,
        },
      },
    })

    res.status(200).send(filteredStudents)
  }
}
