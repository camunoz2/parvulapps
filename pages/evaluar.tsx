import type {
  Category,
  Core,
  Objective,
  Student,
  StudentScoresByObjective,
} from '@prisma/client'
import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import Layout from '../components/UI/Layout'

const TERMS = ['Inicio', 'Intermedia', 'Final']

const Evaluar = () => {
  const queryClient = useQueryClient()
  const [students, setStudents] = useState<Student[]>([])
  const [openSearch, setOpenSearch] = useState(false)
  const [currentStudentId, setCurrentStudentId] = useState<
    number | null
  >(null)
  const [currentStudentName, setCurrentStudentName] = useState<
    string | null
  >(null)
  const [currentTerm, setCurrentTerm] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<
    number | null
  >(null)
  const [currentCore, setCurrentCore] = useState<number | null>(null)

  const scoreMutation = useMutation(
    ({ value, id }: { value: string; id: number }) =>
      handleScore(value, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['scores'])
      },
    }
  )

  const studentsQuery = useQuery(
    ['filtered-students'],
    (): Promise<Student[]> =>
      fetch('/api/get-students', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  const categoryQuery = useQuery(
    ['categories'],
    (): Promise<Category[]> =>
      fetch('/api/get-category', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )
  const coreQuery = useQuery(
    ['cores'],
    (): Promise<Core[]> =>
      fetch('/api/get-core', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  const objectiveQuery = useQuery(
    ['objectives'],
    (): Promise<Objective[]> =>
      fetch('/api/get-objective', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  const scoresQuery = useQuery(
    ['scores'],
    (): Promise<StudentScoresByObjective[]> =>
      fetch('/api/get-scores', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setOpenSearch(true)
    setCurrentStudentName(event.target.name)
    const reg = new RegExp(event.target.value, 'gi')
    if (studentsQuery.data && event.target.value.length > 0) {
      const filtered = studentsQuery.data.filter(
        (item) => item.name.match(reg) || item.lastName.match(reg)
      )
      setStudents(filtered)
    } else setStudents([])
  }

  function handleScore(value: string, id: number) {
    return fetch('/api/set-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: currentStudentId,
        objectiveId: id,
        value: parseInt(value),
        term: currentTerm,
      }),
    })
  }

  function getObjectiveScore(objectiveId: number) {
    const scores = scoresQuery.data?.find((item) => {
      item.objectiveId === objectiveId &&
        item.studentId === currentStudentId
    })

    if (currentTerm === TERMS[0]) {
      return scores?.firstTermScore
    }
    if (currentTerm === TERMS[1]) {
      return scores?.secondTermScore
    }
    if (currentTerm === TERMS[2]) {
      return scores?.thirdTermScore
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col">
            <label>Buscar</label>
            <input
              className="border border-gray-600"
              onChange={handleSearch}
              type="search"
              value={currentStudentName ? currentStudentName : ''}
            />
            <ul className="border border-gray-600 flex flex-col gap-1">
              {studentsQuery.isLoading ? (
                <li>'loading data...'</li>
              ) : (
                students.map((student) => {
                  if (openSearch) {
                    return (
                      <li
                        className="hover:bg-gray-600 hover:text-gray-100 py-1 px-2"
                        key={student.id}
                        onClick={() => {
                          setOpenSearch(false)
                          setCurrentStudentId(student.id)
                          setCurrentStudentName(
                            `${student.name} ${student.lastName}`
                          )
                        }}
                      >
                        {student.name} {student.lastName}
                      </li>
                    )
                  }
                })
              )}
            </ul>
          </div>

          <h2>Tipo de evaluacion</h2>
          <div className="flex flex-row gap-1">
            {TERMS.map((term) => (
              <span
                onClick={() => setCurrentTerm(term)}
                key={term}
                className={`p-1 border ${
                  currentTerm === term
                    ? 'border-green-600 bg-gray-700 text-white'
                    : 'border-gray-600'
                }`}
              >
                {term}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2>Ambitos de aprendizaje</h2>
              <div className="flex flex-col gap-1">
                {categoryQuery.isLoading ? (
                  <p>...loading</p>
                ) : (
                  categoryQuery.data?.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setCurrentCategory(cat.id)}
                      className={`p-1 border ${
                        currentCategory === cat.id
                          ? 'border-green-600 bg-gray-700 text-white'
                          : 'border-gray-600'
                      }`}
                    >
                      <p>{cat.description}</p>
                      <div>
                        0/
                        {
                          coreQuery.data?.filter(
                            (item) => item.categoryId === cat.id
                          ).length
                        }
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2>Nucleos de aprendizaje</h2>
              <div className="flex flex-col gap-1">
                {coreQuery.isLoading ? (
                  <p>...loading</p>
                ) : (
                  coreQuery.data?.map((core) => {
                    if (core.categoryId === currentCategory)
                      return (
                        <div
                          key={core.id}
                          onClick={() => setCurrentCore(core.id)}
                          className={`p-1 border ${
                            currentCore === core.id
                              ? 'border-green-600 bg-gray-700 text-white'
                              : 'border-gray-600'
                          }`}
                        >
                          <p>{core.description}</p>
                          <div>
                            0/
                            {
                              objectiveQuery.data?.filter(
                                (item) =>
                                  item.parentCoreId === core.id
                              ).length
                            }
                          </div>
                        </div>
                      )
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Objetivos / {currentTerm}</h2>
          {objectiveQuery.isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="flex flex-col gap-2">
              {objectiveQuery.data?.map((obj) => {
                if (obj.parentCoreId === currentCore) {
                  return (
                    <div
                      key={obj.id}
                      className="border border-gray-500 rounded-sm py-6 px-4 flex gap-4 items-center justify-between"
                    >
                      <p>{obj.description}</p>

                      <select
                        onChange={(event) =>
                          scoreMutation.mutate({
                            value: event.target.value,
                            id: obj.id,
                          })
                        }
                        value={getObjectiveScore(obj.id)}
                      >
                        <option value={0}>N/O</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                  )
                }
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Evaluar
