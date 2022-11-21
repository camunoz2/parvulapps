import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function addSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sectionsLetter = ['A', 'B', 'C', 'D', 'E']

  const sections = await prisma.grade.count({
    where: {
      classroom: req.body.gradeName,
    },
  })

  if (sections < sectionsLetter.length) {
    await prisma.grade.create({
      data: {
        classroom: req.body.gradeName,
        section: sectionsLetter[sections],
      },
    })
  }

  res.status(200).end()
}
