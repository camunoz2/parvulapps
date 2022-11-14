import type { NextApiRequest, NextApiResponse } from 'next'
import { createCurriculum } from '../../utils/createCurriculum'

export default async function addStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      createCurriculum(req.body.studentId)
      res.status(200).end()
    } catch (error) {
      console.log(error)
      res.status(400)
    }
  }
}
