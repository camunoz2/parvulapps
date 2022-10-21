import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {


  const updateStatus = await prisma.classroom.update({
    where: {
      id: req.body.id
    },
    data: {
      status: req.body.status
    }
  })

  res.status(200)
}