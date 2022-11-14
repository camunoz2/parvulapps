import Layout from '../components/UI/Layout'
import GradeCreator from '../components/GradeCreator'
import { useQuery } from '@tanstack/react-query'
import { Grade } from '@prisma/client'
import { useEffect, useState } from 'react'
import AddStudentComponent from '../components/AddStudentComponent'
import EditableStudentList from '../components/EditableStudentList'

const Configurar = () => {
  const [gradeId, setGradeId] = useState<number | null>(null)

  const gradeQuery = useQuery({
    queryKey: ['grades', gradeId],
    queryFn: getGrades,
  })

  function getGrades(): Promise<Grade[]> {
    return fetch('/api/get-grades', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
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
          <p className="mb-4">
            Configura las secciones por nivel que quieres agregar
          </p>
          <div className="grid gap-2">
            <GradeCreator grade="Sala Cuna" />
            <GradeCreator grade="NT1" />
            <GradeCreator grade="NT2" />
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-bold">Agregar alumnos</h2>

          <div>
            <label className="font-light text-sm pl-1 italic">
              Curso
            </label>
            <div className="flex gap-1">
              {gradeQuery.isLoading ? (
                <p>loading...</p>
              ) : (
                <select
                  name="grade"
                  className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-2 rounded-md"
                  onChange={(event) =>
                    setGradeId(parseInt(event.target.value))
                  }
                >
                  {!gradeId && <option>Elige una sección</option>}
                  {gradeQuery.data?.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.classroom} - {g.section}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <AddStudentComponent gradeId={gradeId} />
          </div>

          <EditableStudentList gradeId={gradeId} />
        </div>
      </div>
    </Layout>
  )
}

export default Configurar
