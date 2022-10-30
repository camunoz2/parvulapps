import type {
  Category,
  Core,
  Objective,
  Student,
} from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import GradeSelector from '../components/GradeSelector'
import SimpleStudentList from '../components/SimpleStudentList'
import Layout from '../components/UI/Layout'
import { CustomGrade } from '../types/app'

const TERMS = ['Inicio', 'Intermedia', 'Final']

const Evaluar = () => {
  const [grade, setGrade] = useState<CustomGrade>({
    classroom: null,
    section: null,
  })

  const [currentSelection, setCurrentSelection] = useState({
    term: '',
    student: 0,
    category: 0,
    core: 0,
  })

  const categories = useQuery(
    ['categories', currentSelection.category, currentSelection.term],
    () => {
      return fetch('/api/get-categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()) as Promise<Category[]>
    }
  )

  const filteredCores = useQuery(
    ['cores', currentSelection.core],
    () => {
      return fetch('/api/get-cores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: currentSelection.category,
        }),
      }).then((res) => res.json()) as Promise<Core[]>
    }
  )
  const filteredObjectives = useQuery(
    ['objectives', currentSelection.term],
    () => {
      return fetch('/api/get-objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coreId: currentSelection.core,
        }),
      }).then((res) => res.json()) as Promise<Objective[]>
    }
  )

  // TODO: Make custom hooks qieh each query

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col">
            <GradeSelector
              grade={grade}
              handleGradeChange={setGrade}
            />
            {grade?.classroom && grade?.section ? (
              <SimpleStudentList
                grade={grade}
                currentSelection={currentSelection}
                setCurrentSelection={setCurrentSelection}
              />
            ) : (
              <p>Elige la clase y la seccion😊</p>
            )}
          </div>

          <h2>Tipo de evaluacion</h2>
          <div className="flex flex-row gap-1">
            {TERMS.map((term) => (
              <span
                onClick={() => {
                  setCurrentSelection({
                    ...currentSelection,
                    term: term,
                  })
                }}
                key={term}
                className={`p-1 border ${
                  currentSelection.term === term
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
                {categories.isLoading ? (
                  <p>...loading</p>
                ) : (
                  categories.data?.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() =>
                        setCurrentSelection({
                          ...currentSelection,
                          category: cat.id,
                        })
                      }
                      className={`p-1 border ${
                        currentSelection.category === cat.id
                          ? 'border-green-600 bg-gray-700 text-white'
                          : 'border-gray-600'
                      }`}
                    >
                      <p>{cat.description}</p>
                      <div>
                        0/
                        {filteredCores.isSuccess &&
                          filteredCores.data?.length}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2>Nucleos de aprendizaje</h2>
              <div className="flex flex-col gap-1">
                {filteredCores.isLoading ? (
                  <p>...loading</p>
                ) : (
                  filteredCores.data?.map((core) => {
                    return (
                      <div
                        key={core.id}
                        onClick={() =>
                          setCurrentSelection({
                            ...currentSelection,
                            core: core.id,
                          })
                        }
                        className={`p-1 border ${
                          currentSelection.core === core.id
                            ? 'border-green-600 bg-gray-700 text-white'
                            : 'border-gray-600'
                        }`}
                      >
                        <p>{core.description}</p>
                        <div>
                          0/
                          {filteredObjectives.data?.length}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div>
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
                        value={
                          currentTerm === TERMS[0]
                            ? obj.firstTermScore
                            : currentTerm === TERMS[1]
                            ? obj.secondTermScore
                            : obj.thirdTermScore
                        }
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
        </div> */}
      </div>
    </Layout>
  )
}

export default Evaluar
