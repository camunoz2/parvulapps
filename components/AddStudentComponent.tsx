import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { rutValidator } from '../utils/rutValidator'

const AddStudentComponent = ({
  gradeId,
}: {
  gradeId: number | null
}) => {
  const queryClient = useQueryClient()
  const [error, setError] = useState(false)

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

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
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
          onChange={handleInput}
          className="bg-white border border-accent py-3 rounded-md px-2"
          name="firstName"
          value={student.firstName}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-light text-sm pl-1 italic">
          Apellido
        </label>
        <input
          title="last name"
          onChange={handleInput}
          className="bg-white border border-accent py-3 rounded-md px-2"
          name="lastName"
          value={student.lastName}
        />
      </div>
      <div className="flex flex-col relative">
        <label className="font-light text-sm pl-1 italic">RUT</label>
        <input
          title="rut"
          onChange={handleInput}
          className="bg-white border border-accent py-3 rounded-md px-2"
          name="rut"
          value={student.rut}
        />
        {error ? (
          <div className="absolute -bottom-5 left-1 text-xs text-red-500">
            Error, formato correcto: xxxxxxxx-x
          </div>
        ) : (
          ''
        )}
      </div>
      <button
        onClick={() => {
          rutValidator(student.rut)
          if (rutValidator(student.rut)) {
            addStudentMutation.mutate()
            setError(false)
          } else setError(true)
        }}
        className="border border-accent py-3 rounded-md px-2 bg-accent hover:cursor-pointer hover:shadow-md"
      >
        Agregar
      </button>
    </div>
  )
}

export default AddStudentComponent
