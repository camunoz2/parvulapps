import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function getStudents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const students = await prisma.student.findMany()
      res.status(200).send(students)
    }

    if (req.method === 'POST') {
      const filteredStudents = await prisma.student.findMany({
        where: {
          gradeId: req.body.grade,
        },
      })

      res.status(200).send(filteredStudents)
    }
    if (req.method === 'POST' && req.body.single === true) {
      const singleStudent = await prisma.student.findUnique({
        where: {
          id: req.body.studentId,
        },
      })

      res.status(200).send(singleStudent)
    }
  } catch (e) {
    console.log(e)
    res.status(400).send('Error with students list')
  }
}
