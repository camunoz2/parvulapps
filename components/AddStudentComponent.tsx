import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const AddStudentComponent = ({
  gradeId,
}: {
  gradeId: number | null
}) => {
  const queryClient = useQueryClient()

  const initialValues = {
    firstName: '',
    lastName: '',
    rut: '',
  }
  const [student, setStudent] = useState(initialValues)

  const addStudentMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students'])
      setStudent(initialValues)
    },
  })

  function addStudent() {
    return fetch('/api/add-student', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        firstName: student.firstName,
        lastName: student.lastName,
        rut: student.rut,
        gradeId: gradeId,
      }),
    })
  }

  return (
    <div className="flex gap-2 items-end">
      <div className="flex flex-col">
        <label className="font-light text-sm pl-1 italic">
          Nombre
        </label>
        <input
          title="first name"
          onChange={(event) => {
            setStudent({ ...student, firstName: event.target.value })
          }}
          className="bg-white border border-accent py-3 rounded-md px-2"
          name="name"
          value={student.firstName}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-light text-sm pl-1 italic">
          Apellido
        </label>
        <input
          title="last name"
          onChange={(event) =>
            setStudent({ ...student, lastName: event.target.value })
          }
          className="bg-white border border-accent py-3 rounded-md px-2"
          name="lastName"
          value={student.lastName}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-light text-sm pl-1 italic">RUT</label>
        <input
          title="rut"
          onChange={(event) =>
            setStudent({
              ...student,
              rut: event.target.value,
            })
          }
          className="bg-white border border-accent py-3 rounded-md px-2"
          name="rut"
          value={student.rut}
        />
      </div>
      <button
        onClick={() => {
          addStudentMutation.mutate()
        }}
        className="border border-accent py-3 rounded-md px-2 bg-accent hover:cursor-pointer hover:shadow-md"
      >
        Agregar
      </button>
    </div>
  )
}

export default AddStudentComponent
