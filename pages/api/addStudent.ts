import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const rut = req.body.rut

  const queryClassroom = await prisma.classroom.findFirst({
    where: {
      name: req.body.classroom,
      AND: {
        section: req.body.section,
      },
    },
  })

  if (queryClassroom) {
    await prisma.student.create({
      data: {
        name: firstName,
        lastName: lastName,
        rut: rut,
        classroomId: queryClassroom.id,
      },
    })
  }

  res.status(200).json({ firstName, lastName, rut, queryClassroom })
}
