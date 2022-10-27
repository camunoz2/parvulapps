import type {
  Category,
  Core,
  EvaluationTerm,
  Indicator,
  Objetive,
  Student,
} from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Layout from '../components/UI/Layout'

const Evaluar = () => {
  const [students, setStudents] = useState<Student[]>([])

  const studentsQuery = useQuery(
    ['filtered-students'],
    (): Promise<Student[]> =>
      fetch('/api/get-students', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  const evaluationTermQuery = useQuery(
    ['evaluation-term'],
    (): Promise<EvaluationTerm[]> =>
      fetch('/api/get-evalterms', {
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
    (): Promise<Objetive[]> =>
      fetch('/api/get-objective', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  const indicatorQuery = useQuery(
    ['indicators'],
    (): Promise<Indicator[]> =>
      fetch('/api/get-indicators', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const reg = new RegExp(event.target.value, 'gi')
    if (studentsQuery.data && event.target.value.length > 0) {
      const filtered = studentsQuery.data.filter(
        (item) => item.name.match(reg) || item.lastName.match(reg)
      )
      setStudents(filtered)
    } else setStudents([])
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
            />
            <ul className="border border-gray-600 flex flex-col gap-1">
              {studentsQuery.isLoading ? (
                <li>'loading data...'</li>
              ) : (
                students.map((student) => (
                  <li
                    className="hover:bg-gray-600 hover:text-gray-100 py-1 px-2"
                    key={student.id}
                  >
                    {student.name}
                  </li>
                ))
              )}
            </ul>
          </div>

          <h2>Tipo de evaluacion</h2>
          <div className="flex flex-row gap-1">
            {evaluationTermQuery.isLoading ? (
              <p>...loading</p>
            ) : (
              evaluationTermQuery.data?.map((term) => (
                <span
                  key={term.id}
                  className="p-1 border border-gray-600"
                >
                  {term.name}
                </span>
              ))
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2>Ambitos de aprendizaje</h2>
              <div className="flex flex-col gap-1">
                {categoryQuery.isLoading ? (
                  <p>...loading</p>
                ) : (
                  categoryQuery.data?.map((cat) => (
                    <div className="border border-gray-700 p-2 flex justify-between">
                      <p>{cat.description}</p>
                      <div>1/3</div>
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
                  coreQuery.data?.map((core) => (
                    <div className="border border-gray-700 p-2 flex justify-between">
                      <p>{core.description}</p>
                      <div>1/3</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Objetivos</h2>
          {objectiveQuery.isLoading ? (
            <p>loading...</p>
          ) : (
            objectiveQuery.data?.map((obj) => (
              <span className="border border-gray-500 rounded-sm">
                {obj.description}
              </span>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Evaluar
