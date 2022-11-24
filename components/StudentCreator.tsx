import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface Props {
  classroom: string
  section: string
}

const StudentCreator = ({ classroom, section }: Props) => {
  const queryClient = useQueryClient()
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    rut: '',
  })

  const mutation = useMutation(
    () => {
      return fetch('/api/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroom,
          section,
          firstName: student.firstName,
          lastName: student.lastName,
          rut: student.rut,
        }),
      })
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(['filtered-students'])
      },
    }
  )

  return (
    <div>
      <input
        title="Nombre"
        type="text"
        className="border border-gray-400"
        onChange={(event) => {
          setStudent({ ...student, firstName: event.target.value })
        }}
        value={student.firstName}
        name="firstName"
      />
      <input
        title="Apellido"
        type="text"
        className="border border-gray-400"
        onChange={(event) => {
          setStudent({ ...student, lastName: event.target.value })
        }}
        value={student.lastName}
        name="lastName"
      />
      <input
        title="Rut"
        type="text"
        className="border border-gray-400"
        onChange={(event) => {
          setStudent({ ...student, rut: event.target.value })
        }}
        value={student.rut}
        name="rut"
      />
      <button onClick={() => mutation.mutate()}>Agregar</button>
    </div>
  )
}

export default StudentCreator
