import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function addSection(
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

    const sectionsLetter = ['A', 'B', 'C', 'D', 'E']

    const sections = await prisma.grade.count({
      where: {
        classroom: req.body.gradeName,
      },
    })

    if (session.user?.email) {
      const teacher = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })

      if (sections < sectionsLetter.length) {
        await prisma.grade.create({
          data: {
            classroom: req.body.gradeName,
            section: sectionsLetter[sections],
            teacherId: teacher!.id,
          },
        })
      }
    }
    res.status(200).end()
  } catch (error) {
    console.log(error)
  }
}
