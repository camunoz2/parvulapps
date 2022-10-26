import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function addSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sections = ['A', 'B', 'C', 'D', 'E']
  const message = ''

  const nt1Sections = await prisma.grade.count({
    where: {
      classroom: 'NT1',
    },
  })
  const nt2Sections = await prisma.grade.count({
    where: {
      classroom: 'NT2',
    },
  })

  if (nt1Sections < sections.length && req.body.name === 'NT1') {
    const createNt1Grade = await prisma.grade.create({
      data: {
        classroom: req.body.name,
        section: sections[nt1Sections],
      },
    })
  }
  if (nt2Sections < sections.length && req.body.name === 'NT2') {
    const createNt1Grade = await prisma.grade.create({
      data: {
        classroom: req.body.name,
        section: sections[nt2Sections],
      },
    })
  }

  res.status(200).end()
}
