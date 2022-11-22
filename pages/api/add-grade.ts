import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function addSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session)
    return res.status(401).json({ message: 'Acceso no autorizado' })

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
}
