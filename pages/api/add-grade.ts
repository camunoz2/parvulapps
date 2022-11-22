import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function addSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check user login
    const session = await unstable_getServerSession(
      req,
      res,
      authOptions
    )
    if (!session?.user?.email)
      return res
        .status(400)
        .send({ message: 'El usuario no tiene un email valido' })

    // Check sections quantity
    const sectionsLetter = ['A', 'B', 'C', 'D', 'E']
    const sections = await prisma.grade.count({
      where: {
        classroom: req.body.gradeName,
      },
    })

    if (sections > sectionsLetter.length)
      return res.status(400).send({
        message: 'Alcanzaste el maximo de secciones creadas',
      })

    // Check teacher email
    const teacher = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })
    if (!teacher)
      return res
        .status(400)
        .send({ message: 'Usuario no encontrado' })

    // Create grade
    await prisma.grade.create({
      data: {
        classroom: req.body.gradeName,
        section: sectionsLetter[sections],
        teacherId: teacher?.id,
      },
    })
    res.status(200).end()
  } catch (error) {
    console.log(error)
  }
}
