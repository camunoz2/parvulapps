import { Student } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import TableCell from './UI/TableCell'

interface Props {
  classroom: string
  section: string
}

const EditableStudentList = ({ classroom, section }: Props) => {
  const queryClient = useQueryClient()
  const [edit, setEdit] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [updatedStudent, setUpdatedStudent] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    rut: '',
  })

  const updateStudentMutation = useMutation(
    (id: number) => updateStudent(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['filtered-students']),
    }
  )
  const deleteStudentMutation = useMutation(
    (id: number) => deleteStudent(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['filtered-students']),
    }
  )

  const students = useQuery(
    ['filtered-students', classroom, section],
    (): Promise<Student[]> => {
      return fetch('/api/get-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroom,
          section,
        }),
      }).then((res) => res.json())
    }
  )

  function updateStudent(id: number) {
    return fetch('/api/update-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        rut: updatedStudent.rut,
        id: id,
      }),
    })
  }

  function deleteStudent(id: number) {
    return fetch('/api/delete-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    })
  }

  if (students.isLoading) return <p>...loading</p>

  return (
    <>
      <div onClick={() => setEdit(!edit)}>Editar</div>
      {openModal && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-slate-800/75 flex justify-center items-center">
          <div className="border border-gray-500/10 flex flex-col gap-4">
            <input
              type="text"
              value={updatedStudent.firstName}
              name="firstName"
              onChange={(event) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  firstName: event?.target.value,
                })
              }
            />
            <input
              type="text"
              value={updatedStudent.lastName}
              name="firstName"
              onChange={(event) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  lastName: event?.target.value,
                })
              }
            />
            <input
              type="text"
              value={updatedStudent.rut}
              name="firstName"
              onChange={(event) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  rut: event?.target.value,
                })
              }
            />
            <button
              onClick={() => {
                updateStudentMutation.mutate(updatedStudent.id)
                setOpenModal(false)
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
      <table className="border border-gray-800">
        <thead>
          <tr>
            <td className="border border-gray-800">Nombre</td>
            <td className="border border-gray-800">Apellido</td>
            <td className="border border-gray-800">RUT</td>
          </tr>
        </thead>
        <tbody>
          {students.data?.map((student) => (
            <tr key={student.id}>
              <TableCell content={student.name} />
              <TableCell content={student.lastName} />
              <TableCell content={student.rut} />

              {edit && (
                <>
                  <td
                    onClick={() => {
                      setUpdatedStudent({
                        ...updatedStudent,
                        id: student.id,
                      })
                      setOpenModal(true)
                    }}
                    className="border border-gray-800 text-xl"
                  >
                    ✍️
                  </td>
                  <td
                    onClick={() => {
                      deleteStudentMutation.mutate(student.id)
                    }}
                    className="border border-gray-800 text-xl"
                  >
                    🚮
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default EditableStudentList
