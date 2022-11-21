import { Objective } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Image from 'next/image'
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

const COLORS = [
  'bg-white',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-green-200',
]

const PIXEL_LENGTH = 50

const Evaluar = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  //For controlling opening and close of student list on mobile, pass to sidebar
  const [studentListMenu, setStudentListMenu] = useState(false)

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  useEffect(() => {
    router.replace('/evaluar')
  }, [''])

  const [student, setStudent] = useState({
    name: '',
    id: 0,
  })

  const scoreMutation = useMutation({
    mutationFn: ({ value, id }: { value: number; id: number }) => {
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
    onSuccess: () => queryClient.invalidateQueries(['objectives']),
  })

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
    <div className="flex flex-col lg:flex-row h-full px-2 lg:px-0">
      <SideBar
        studentListMenu={studentListMenu}
        handleStudentList={setStudentListMenu}
      />
      <div className="flex flex-col mx-auto lg:px-12">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo linked small />
          <Menu />
        </div>
        <div className="py-2">
          <Dashed />
        </div>

        {router.query.grade &&
        router.query.evalType &&
        router.query.categories &&
        router.query.core ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:mt-10 gap-4 h-full auto-rows-min items-start">
            <div className="col-span-1">
              <h2 className="hidden lg:block font-bold text-2xl">
                Alumnos
              </h2>
              <h2 className="lg:hidden font-bold text-2xl">
                {student.name}
              </h2>
            </div>

            {student.id >= 0 ? (
              <div className="flex justify-between col-span-1 lg:col-span-2">
                <div className="hidden lg:block">
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
                <p className="text-lg">
                  Seleccion a un alumno de la lista 👌
                </p>
              </div>
            )}

            <div
              className={`${
                studentListMenu
                  ? 'col-span-2 block'
                  : 'col-span-1 hidden lg:block'
              }`}
            >
              <StudentList
                currentSelection={student.id}
                setCurrentSelection={setStudent}
              />
            </div>

            <div className="self-start overflow-auto h-[500px] lg:h-[700px] scroll-smooth lg:col-span-2 col-span-1 text-xs lg:text-base">
              {objectives.isLoading && student.id >= 0 ? (
                <p className="text-lg">
                  Para ver los objetivos debes seleccionar un alumno
                  de la lista 🙌
                </p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div className="lg:col-span-2 flex gap-1 sticky top-0 p-2">
                    <p
                      className={`${COLORS[1]} p-2 rounded-full text-sm border border-accent`}
                    >
                      Nivel 1 / Sala Cuna
                    </p>
                    <p
                      className={`${COLORS[2]} p-2 rounded-full text-sm border border-accent`}
                    >
                      Nivel 2 / PreKinder
                    </p>
                    <p
                      className={`${COLORS[3]} p-2 rounded-full text-sm border border-accent`}
                    >
                      Nivel 3 / Kinder
                    </p>
                  </div>
                  {objectives.data?.map((obj) => {
                    if (
                      obj.parentCoreId ===
                        parseInt(router.query.core as string) &&
                      obj.studentId === student.id
                    ) {
                      return (
                        <div
                          key={obj.id}
                          className={`border border-accent rounded-md py-6 px-4 flex flex-col lg:flex-row gap-2 lg:gap-4 items-center justify-between ${
                            COLORS[obj.level]
                          } shadow-md`}
                        >
                          <p className="text-lg">{obj.description}</p>
                          <select
                            title="score"
                            className="bg-white p-2 border border-accent rounded-md text-xl hover:cursor-pointer"
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
          <div className="absolute left-1/2 top-72 -translate-x-1/2">
            <Image
              width={320}
              height={320}
              src="/no_results.svg"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Evaluar
