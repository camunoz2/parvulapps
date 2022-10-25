import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import type { Student } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as { classroom: string; section: string }
  const { classroom, section } = query

  let students: Student[] = []

  const queryClassroom = await prisma.classroom.findFirst({
    where: {
      name: classroom,
      section: section,
    },
  })

  try {
    if (queryClassroom) {
      students = await prisma.student.findMany({
        where: {
          classroom: queryClassroom,
        },
      })
    }
  } catch (e) {
    console.error(e)
  }

  res.status(200).send(students)
}
