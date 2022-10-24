import { Classroom } from '@prisma/client'
import React, { useState } from 'react'
import Button from '../components/UI/Button'
import Layout from '../components/UI/Layout'
import TextInput from '../components/UI/TextInput'
import prisma from '../lib/prisma'

interface Props {
  nt1: Classroom[]
  nt2: Classroom[]
}

const Agregar = ({ nt1, nt2 }: Props) => {
  const [selectClass, setSelectClass] = useState('NT1')

  const classrooms = ['NT1', 'NT2']

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectClass(event.target.value)
  }

  return (
    <Layout>
      <h2>Agregar alumnos</h2>
      <div className="flex gap-1">
        <div className="border border-gray-400 p-1">
          <select value={selectClass} onChange={handleSelect}>
            {classrooms.map((classroom, index) => (
              <option key={index} value={classroom}>
                {classroom}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-gray-400 p-1">
          <select>
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
        <TextInput text="Nombre" name="name" />
        <TextInput text="Apellido" name="lastName" />
        <TextInput text="RUT" name="rut" />
        <Button>Agregar</Button>
      </form>
    </Layout>
  )
}

export default Agregar

export const getServerSideProps = async () => {
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
    },
  }
}
