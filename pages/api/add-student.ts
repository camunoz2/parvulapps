import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { createCurriculum } from '../../utils/createCurriculum'

export default async function addStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const student = await prisma.student.create({
      data: {
        name: req.body.firstName,
        lastName: req.body.lastName,
        rut: req.body.rut,
        gradeId: req.body.gradeId,
      },
    })

    createCurriculum(student.id)
    res.status(200).end()
  } catch (error) {
    console.log(error)
  }
}
