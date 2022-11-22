import { useState } from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Grade } from '@prisma/client'
import Layout from '../components/UI/Layout'
import GradeCreator from '../components/GradeCreator'
import AddStudentComponent from '../components/AddStudentComponent'
import EditableStudentList from '../components/EditableStudentList'
import { useSession } from 'next-auth/react'
import router from 'next/router'

const GRADES = ['Sala Cuna', 'NT1', 'NT2']

const Configurar = () => {
  const queryClient = useQueryClient()
  const [gradeId, setGradeId] = useState<number | null>(null)
  const [gradeName, setGradeName] = useState(GRADES[0])
  const [classrooms, setClassrooms] = useState<Array<string> | null>(
    null
  )

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  const gradeQuery = useQuery({
    queryKey: ['grades'],
    queryFn: getGrades,
    onSuccess: getClassrooms,
  })

  function getGrades(): Promise<Grade[]> {
    return fetch('/api/get-grades', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  const createGrade = useMutation({
    mutationFn: () => {
      return fetch('/api/add-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradeName: gradeName,
        }),
      })
    },
    onSuccess: () => queryClient.invalidateQueries(['grades']),
  })

  function getClassrooms(arr: Grade[]) {
    const result = new Set<string>()
    arr.map((grade) => result.add(grade.classroom))
    const newArr = Array.from(result)
    setClassrooms(newArr)
  }

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6 pt-6">
        <div>
          <h2 className="text-xl font-bold">Detalles</h2>
          <p className="mb-4">
            En este sección podras crear los cursos asociados a tu
            institución educativa , las secciones que tienes y los
            alumnos que asisten a cada seccion
          </p>
          <h2 className="text-xl font-bold">Secciones</h2>
          <p className="mb-4">¿Qué curso quieres agregar?</p>
          <div className="flex gap-2">
            <select
              defaultValue={GRADES[0]}
              onChange={(event) => setGradeName(event.target.value)}
              className="rounded-md py-3 px-2 bg-white text-dark border border-accent"
              title="grade creator"
            >
              {GRADES.map((grade, i) => (
                <option key={i} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            <button
              onClick={() => createGrade.mutate()}
              className="px-4 py-3 bg-accent rounded-md hover:cursor-pointer hover:shadow-md"
            >
              Agregar curso
            </button>
          </div>
          <div className="flex gap-2 py-3 flex-wrap">
            {gradeQuery.isLoading ? (
              <p>Loading...</p>
            ) : (
              gradeQuery.data?.map((grade) => {
                return (
                  <GradeCreator
                    queryClient={queryClient}
                    key={grade.id}
                    grade={grade}
                  />
                )
              })
            )}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-bold">Agregar alumnos</h2>

          <div>
            <div className="flex gap-1">
              {gradeQuery.isLoading ? (
                <p>loading...</p>
              ) : (
                <select
                  title="grade selector"
                  name="grade"
                  className="bg-white border border-accent py-3 rounded-md"
                  onChange={(event) =>
                    setGradeId(parseInt(event.target.value))
                  }
                >
                  {!gradeId && <option>Curso</option>}
                  {gradeQuery.data?.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.classroom} - {g.section}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {gradeId && <AddStudentComponent gradeId={gradeId} />}
          </div>

          <EditableStudentList gradeId={gradeId} />
        </div>
      </div>
    </Layout>
  )
}

export default Configurar
