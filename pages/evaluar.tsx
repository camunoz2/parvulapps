import { Objective } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import GradeSelector from '../components/GradeSelector'
import SideBar from '../components/SideBar'
import StudentList from '../components/StudentList'
import Dashed from '../components/UI/Dashed'
import Layout from '../components/UI/Layout'
import Logo from '../components/UI/Logo'
import Menu from '../components/UI/Menu'
import { Curriculum, CustomGrade } from '../types/app'

export const TERMS = ['Inicio', 'Intermedia', 'Final']

const Evaluar = () => {
  const queryClient = useQueryClient()

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

  const curriculum = useQuery(['curriculum'], fetchCurriculum)

  function fetchCurriculum(): Promise<Curriculum> {
    return fetch('/api/get-curriculum', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json())
  }

  const scoreMutation = useMutation(
    ({ value, id }: { value: number; id: number }) => {
      return fetch('/api/set-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          term: currentSelection.term,
          objectiveId: id,
          value: value,
        }),
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['objectives']),
    }
  )

  const objectives = useQuery(
    ['objectives', currentSelection.term, currentSelection.student],
    fetchObjectives
  )

  function fetchObjectives(): Promise<Objective[]> {
    return fetch('/api/get-objectives', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  }

  //TODO: If I change student, i sshould choose a term again

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col mx-12 container">
        <div className="flex items-center h-[110px] justify-between">
          <Logo small />
          <input
            type="search"
            className="rounded-md border border-accent fonst light px-2 h-[43px]"
            placeholder="Buscar alumno"
          />
          <Menu />
        </div>
        <Dashed />

        <div className="flex gap-2 mt-10">
          <div>
            <h2 className="font-bold text-2xl">Sala cuna - A</h2>
            {grade?.classroom && grade?.section ? (
              <StudentList
                grade={grade}
                currentSelection={currentSelection}
                setCurrentSelection={setCurrentSelection}
              />
            ) : (
              <p>Elige la clase y la seccion😊</p>
            )}
          </div>

          <div className="flex w-full justify-between">
            <div>
              <h2 className="text-2xl font-bold">Mary Stehr</h2>
              <p className="text-xs">Sala cuna - A</p>
            </div>

            <div className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-4 rounded-md flex justify-center items-center">
              <div className="flex gap-1">
                <div className="w-10 h-2 bg-teal-300" />
                <p>Desarrollo personal y social</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col">
            <GradeSelector
              grade={grade}
              handleGradeChange={setGrade}
            />
          </div>

          {currentSelection.student ? (
            <div>
              <h2>Tipo de evaluacion</h2>
              <div className="flex flex-row gap-1">
                {TERMS.map((term) => (
                  <span
                    onClick={() => {
                      setCurrentSelection({
                        ...currentSelection,
                        term: term,
                      })
                      curriculum.refetch()
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
            </div>
          ) : (
            ''
          )}

          <div className="flex flex-col gap-6">
            {currentSelection.term ? (
              <div>
                <h2>Ambitos de aprendizaje</h2>
                <div className="flex flex-col gap-1">
                  {curriculum.isLoading ? (
                    <p>...loading</p>
                  ) : (
                    curriculum.data?.categories.map((cat) => (
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
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              ''
            )}

            {currentSelection.category ? (
              <div>
                <h2>Nucleos de aprendizaje</h2>
                <div className="flex flex-col gap-1">
                  {curriculum.isLoading ? (
                    <p>...loading</p>
                  ) : (
                    curriculum.data?.cores.map((core) => {
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
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        <div>
          <h2>Objetivos / {currentSelection.term}</h2>
          {objectives.isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="flex flex-col gap-2">
              {objectives.data?.map((obj) => {
                if (
                  obj.parentCoreId === currentSelection.core &&
                  obj.studentId === currentSelection.student
                ) {
                  return (
                    <div
                      key={obj.id}
                      className="border border-gray-500 rounded-sm py-6 px-4 flex gap-4 items-center justify-between"
                    >
                      <p>{obj.description}</p>
                      <select
                        onChange={(event) => {
                          scoreMutation.mutate({
                            value: parseInt(event.target.value),
                            id: obj.id,
                          })
                        }}
                        value={
                          currentSelection.term === TERMS[0]
                            ? obj.firstTermScore
                            : currentSelection.term === TERMS[1]
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
        </div>
      </div>
    </div>
  )
}

export default Evaluar
