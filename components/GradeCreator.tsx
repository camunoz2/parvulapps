import { Grade, Student } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'

const GradeCreator = ({ grade }: { grade: Grade }) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const studentsQuery = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  })

  function getStudents(): Promise<Student[]> {
    return fetch('/api/get-students', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  const deleteSection = useMutation({
    mutationFn: () => {
      return fetch('/api/delete-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gradeId: grade.id }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['grades'])
    },
  })

  const studentsNumber = studentsQuery.data?.filter(
    (student) => student.gradeId === grade.id
  )

  return (
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-slate-500/90 backdrop-blur flex items-center justify-center">
          <div className="p-6 rounded-md border border-slate-700 flex flex-col bg-white">
            <p className="font-bold text-xl mb-10">
              Eliminar sección: {grade.classroom} - {grade.section}
            </p>
            <p className="mb-6">
              Esta acción es irreversible, ¿estás seguro de que
              quieres eliminar esta sección?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-700 text-white py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteSection.mutate()
                  setIsOpen(false)
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 text-center border p-4 rounded-md">
        <h3>
          {grade.classroom} - {grade.section}
        </h3>
        <p className="text-xs">{studentsNumber?.length} Alumnos</p>
        <button
          className="bg-red-500 border rounded-md p-2"
          onClick={() => setIsOpen(true)}
        >
          Eliminar
        </button>
      </div>
    </>
  )
}

export default GradeCreator
