import { Objective, Student } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import StudentList from '../components/StudentList'
import Dashed from '../components/UI/Dashed'
import Logo from '../components/UI/Logo'
import Menu from '../components/UI/Menu'

export const TERMS = [
  {
    name: 'Diagnóstica',
    id: 0,
  },
  {
    name: 'Intermedia',
    id: 1,
  },
  {
    name: 'Final',
    id: 2,
  },
]

const PIXEL_LENGTH = 50

const Evaluar = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  useEffect(() => {
    router.replace('/evaluar')
  }, [])

  const [student, setStudent] = useState({
    name: '',
    id: 0,
  })

  const scoreMutation = useMutation(
    ({ value, id }: { value: number; id: number }) => {
      return fetch('/api/set-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          term: parseInt(router.query.evalType as string),
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
    ['objectives', student, router.query],
    (): Promise<Objective[]> => {
      return fetch('/api/get-objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: student.id,
          core: parseInt(router.query.core as string),
        }),
      }).then((res) => res.json())
    },
    {
      enabled: !!student.id,
    }
  )

  function getTotalScore(): {
    studentScore: number
    currentPixels: number
  } {
    if (objectives.isSuccess) {
      const totalScore = objectives.data.length * 5

      const studentScore = objectives.data.reduce((prev, curr) => {
        if (parseInt(router.query.evalType as string) === 0)
          return curr.firstTermScore + prev
        if (parseInt(router.query.evalType as string) === 1)
          return curr.secondTermScore + prev
        return curr.thirdTermScore + prev
      }, 0)
      const currentPixels = (studentScore * PIXEL_LENGTH) / totalScore
      return { studentScore, currentPixels }
    }
    return { studentScore: 0, currentPixels: 0 }
  }

  return (
    <div className="flex bg-[#F6FAFF]">
      <SideBar />
      <div className="flex flex-col mx-12 container">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo small />
          <Menu />
        </div>
        <div className="py-2">
          <Dashed />
        </div>

        {router.query.grade &&
        router.query.evalType &&
        router.query.categories &&
        router.query.core ? (
          <div className="grid grid-cols-2 mt-10 gap-4 h-full auto-rows-min items-center">
            <div className="col-span-1">
              <h2 className="font-bold text-2xl">Alumnos</h2>
            </div>

            {student.id >= 0 ? (
              <div className="flex justify-between col-span-1">
                <div>
                  <h2 className="text-2xl font-bold underline">
                    {student.name}
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-4 rounded-md">
                  <div className="flex items-center gap-1">
                    <div
                      style={{ width: PIXEL_LENGTH + 'px' }}
                      className="relative h-2 bg-white rounded-md"
                    >
                      <div
                        style={{
                          width: getTotalScore().currentPixels + 'px',
                        }}
                        className="absolute left-0 top-0 h-2 bg-teal-300 rounded-md"
                      />
                    </div>
                    <p>
                      Puntaje Núcleo: {getTotalScore().studentScore}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p>Seleccion a un alumno de la lista 👌</p>
              </div>
            )}

            <div className="col-span-1">
              <StudentList
                currentSelection={student.id}
                setCurrentSelection={setStudent}
              />
            </div>

            <div className="self-start overflow-auto h-[700px] scroll-smooth">
              {objectives.isLoading && student.id >= 0 ? (
                <p>Seleccion a un alumno de la lista 👌</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {objectives.data?.map((obj) => {
                    if (
                      obj.parentCoreId ===
                        parseInt(router.query.core as string) &&
                      obj.studentId === student.id
                    ) {
                      return (
                        <div
                          key={obj.id}
                          className="border border-accent rounded-md py-6 px-4 flex gap-4 items-center justify-between bg-white shadow-md"
                        >
                          <p>{obj.description}</p>
                          <select
                            className="bg-white p-2 border border-accent rounded-md"
                            onChange={(event) => {
                              scoreMutation.mutate({
                                value: parseInt(event.target.value),
                                id: obj.id,
                              })
                            }}
                            value={
                              parseInt(
                                router.query.evalType as string
                              ) === TERMS[0].id
                                ? obj.firstTermScore
                                : parseInt(
                                    router.query.evalType as string
                                  ) === TERMS[1].id
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
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <img src="/no_results.svg" alt="" className="w-80" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Evaluar
