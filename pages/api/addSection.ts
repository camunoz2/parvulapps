import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function addSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sections = ['A', 'B', 'C', 'D', 'E']

  await prisma.classroom.create({
    data: {
      name: req.body.name,
      fantasyName: req.body.fantasyName,
      section: sections[req.body.classrooms.length],
    },
  })

  res.status(200).end()
}
