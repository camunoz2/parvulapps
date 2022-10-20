import { Classroom, PrismaClient } from '@prisma/client'

import Head from 'next/head'
import React, { useState } from 'react'

const prisma = new PrismaClient()

export async function getServerSideProps() {
  const data = await prisma.classroom.findMany()
  return {
    props: {
      classes: data,
    },
  }
}

interface Props {
  classes: Classroom[]
}

const Home = ({ classes }: Props) => {
  interface Student {
    name: string
    lastName: string
    rut: string
    class: string
    section: string
  }

  const initialState = {
    name: '',
    lastName: '',
    rut: '',
    class: '',
    section: '',
  }

  const [studentData, setStudentData] = useState<Student>(initialState)
  const [studentList, setStudentList] = useState<Student[] | null>(null)

  const addStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStudentList((curr) => curr && [...curr, studentData])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Head>
        <title>
          Parvulapps | Plataforma de evaluacion para educacion parvularia
        </title>
        <meta
          name="description"
          content="Plataforma de evaluacion para educacion parvularia"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-green-200"></main>
    </div>
  )
}

export default Home
