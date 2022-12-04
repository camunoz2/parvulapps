import { Student } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  gradeId: number | null
}

const EditableStudentList = ({ gradeId }: Props) => {
  const queryClient = useQueryClient()
  const [modal, setModal] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentRut: '',
    open: false,
  })
  const [updatedStudent, setUpdatedStudent] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    rut: '',
  })

  const updateStudentMutation = useMutation(
    (id: number) => updateStudent(id),
    {
      onSuccess: () => queryClient.invalidateQueries(['students']),
    }
  )
  const deleteStudentMutation = useMutation(
    (id: number) => deleteStudent(id),
    {
      onSuccess: () => queryClient.invalidateQueries(['students']),
    }
  )

  const students = useQuery(
    ['students', gradeId],
    (): Promise<Student[]> => {
      return fetch('/api/get-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade: gradeId }),
      }).then((res) => res.json())
    },
    {
      enabled: !!gradeId,
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

  if (!gradeId) return <p>Elige el curso 👌</p>

  if (students.isLoading) return <p>...loading</p>

  return (
    <div className="items-start flex flex-col p-2 rounded h-[500px] overflow-auto">
      {modal.open && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-slate-800/75 flex justify-center items-center">
          <div className="flex flex-col gap-2 border border-accent p-10 rounded-md bg-white">
            <div className="flex flex-col">
              <label>Nombre</label>
              <input
                title="Nombre"
                className="p-2 border border-accent"
                type="text"
                name="firstName"
                defaultValue={modal.studentFirstName}
                onChange={(event) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    firstName: event?.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label>Apellido</label>

              <input
                title="Apellido"
                className="p-2 border border-accent"
                type="text"
                defaultValue={modal.studentLastName}
                name="lastName"
                onChange={(event) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    lastName: event?.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col">
              <label>Rut</label>

              <input
                title="Rut"
                className="p-2 border border-accent"
                type="text"
                value={modal.studentRut}
                name="rut"
                onChange={(event) => {
                  setUpdatedStudent({
                    ...updatedStudent,

                    rut: event.target.value,
                  })
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="bg-accent px-2 text-center py-2 rounded-md"
                onClick={() => {
                  updateStudentMutation.mutate(updatedStudent.id)
                  setModal({ ...modal, open: false })
                }}
              >
                Aceptar
              </button>
              <button
                className="bg-red-200 px-2 text-center py-2 rounded-md"
                onClick={() => {
                  setModal({ ...modal, open: false })
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="bg-white w-full mt-4">
        <thead className="text-sm italic">
          <tr>
            <td>N</td>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>RUT</td>
          </tr>
        </thead>
        <tbody>
          {students.data?.map((student, index) => (
            <tr key={student.id}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{student.name}</td>
              <td className="py-2">{student.lastName}</td>
              <td className="py-2">{student.rut}</td>

              <>
                <td
                  onClick={() => {
                    setUpdatedStudent({
                      ...updatedStudent,
                      id: student.id,
                    })
                    setModal({
                      studentFirstName: student.name,
                      studentLastName: student.lastName,
                      studentRut: student.rut,
                      open: true,
                    })
                  }}
                >
                  <Image
                    src="/edit_icon.svg"
                    width={16}
                    height={16}
                  />
                </td>
                <td
                  onClick={() => {
                    deleteStudentMutation.mutate(student.id)
                  }}
                >
                  <Image
                    src="/trash_icon.svg"
                    width={16}
                    height={16}
                  />
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditableStudentList
