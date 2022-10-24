import { Classroom, Student } from '@prisma/client'
import { equal } from 'assert'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '../components/UI/Button'
import Layout from '../components/UI/Layout'
import TextInput from '../components/UI/TextInput'
import prisma from '../lib/prisma'

interface Props {
  classroom: Classroom[]
  nt1: Classroom[]
  nt2: Classroom[]
  students: Student[]
}

const Agregar = ({ nt1, nt2, classroom, students }: Props) => {
  const router = useRouter()

  const [selectClass, setSelectClass] = useState('NT1')
  const [selectSection, setSelectSection] = useState('A')

  const classrooms = ['NT1', 'NT2']

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    rut: '',
  })

  const handleClassroomSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectClass(event.target.value)
  }

  const handleSectionSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectSection(event.target.value)
  }

  const handleStudent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    })
  }

  const addStudent = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    // TODO: add validation
    if (
      student.firstName.length > 0 &&
      student.lastName.length > 0 &&
      student.rut.length > 0
    ) {
    }
    const res = await fetch('/api/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: student.firstName,
        lastName: student.lastName,
        rut: student.rut,
        classroom: selectClass,
        section: selectSection,
      }),
    })
    if (res.status === 200) {
      router.push(router.asPath)
    }
  }

  return (
    <Layout>
      <h2>Agregar alumnos</h2>
      <div className="flex gap-1">
        <div className="border border-gray-400 p-1">
          <select
            value={selectClass}
            onChange={handleClassroomSelect}
          >
            {classrooms.map((classroom, index) => (
              <option key={index} value={classroom}>
                {classroom}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-gray-400 p-1">
          <select onChange={handleSectionSelect}>
            {selectClass === 'NT1'
              ? nt1.map((classroom) => (
                  <option
                    key={classroom.id}
                    value={classroom.section}
                  >
                    {classroom.section}
                  </option>
                ))
              : nt2.map((classroom) => (
                  <option
                    key={classroom.id}
                    value={classroom.section}
                  >
                    {classroom.section}
                  </option>
                ))}
          </select>
        </div>
      </div>

      <h2>Alumnos</h2>
      <form className="flex gap-1">
        <input
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleStudent}
          className="border border-green-500"
        />
        <input
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleStudent}
          className="border border-green-500"
        />
        <input
          type="text"
          name="rut"
          value={student.rut}
          onChange={handleStudent}
          className="border border-green-500"
        />
        <button
          onClick={addStudent}
          type="submit"
          className="bg-gray-700 px-2"
        >
          Agregar
        </button>
      </form>

      <table className="table-auto border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-400">Nombre</th>
            <th className="border border-slate-400">Apellido</th>
            <th className="border border-slate-400">Rut</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border border-slate-400">
                {student.name}
              </td>
              <td className="border border-slate-400">
                {student.lastName}
              </td>
              <td className="border border-slate-400">
                {student.rut}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Agregar

export const getServerSideProps = async () => {
  const students = await prisma.student.findMany()
  const classrooms = await prisma.classroom.findMany()
  const nt1 = await prisma.classroom.findMany({
    where: {
      name: 'NT1',
    },
  })
  const nt2 = await prisma.classroom.findMany({
    where: {
      name: 'NT2',
    },
  })

  return {
    props: {
      classrooms,
      nt1,
      nt2,
      students,
    },
  }
}
