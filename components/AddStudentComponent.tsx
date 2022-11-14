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
          onChange={(event) =>
            setStudent({ ...student, firstName: event.target.value })
          }
          className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-2 h-8 rounded-md"
          name="name"
          value={student.firstName}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-light text-sm pl-1 italic">
          Apellido
        </label>
        <input
          onChange={(event) =>
            setStudent({ ...student, lastName: event.target.value })
          }
          className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-2 h-8 rounded-md"
          name="lastName"
          value={student.lastName}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-light text-sm pl-1 italic">RUT</label>
        <input
          onChange={(event) =>
            setStudent({
              ...student,
              rut: event.target.value,
            })
          }
          className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-2 h-8 rounded-md"
          name="rut"
          value={student.rut}
        />
      </div>
      <button
        onClick={() => {
          addStudentMutation.mutate()
        }}
        className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] px-2 h-8 rounded-md text-center"
      >
        Agregar
      </button>
    </div>
  )
}

export default AddStudentComponent
