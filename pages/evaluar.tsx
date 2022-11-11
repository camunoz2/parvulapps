import { Objective, Student } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
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

const Evaluar = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    router.replace('/evaluar')
  }, [])

  const [student, setStudent] = useState({
    name: '',
    id: 0,
  })

  const router = useRouter()

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

  return (
    <div className="flex bg-[#F6FAFF]">
      <SideBar />
      <div className="flex flex-col mx-12 container">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo small />
          <input
            type="search"
            className="rounded-md border border-accent fonst light px-2 py-2 w-full"
            placeholder="Buscar alumno"
          />
          <Menu />
        </div>
        <div className="py-2">
          <Dashed />
        </div>

        <div className="grid grid-cols-2 mt-10 gap-4 h-full auto-rows-min items-center">
          <div className="col-span-1">
            <h2 className="font-bold text-2xl">Alumnos</h2>
          </div>

          <div className="flex justify-between col-span-1">
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
            </div>

            <div className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-4 rounded-md">
              <div className="flex items-center gap-1">
                <div className="w-10 h-2 bg-teal-300" />
                <p>Desarrollo personal y social</p>
              </div>
            </div>
          </div>

          {router.query.grade &&
          router.query.grade &&
          router.query.evalType &&
          router.query.core ? (
            <div className="col-span-1">
              <StudentList
                currentSelection={student.id}
                setCurrentSelection={setStudent}
              />
            </div>
          ) : (
            <img src="/no_results.svg" alt="" className="w-80" />
          )}

          <div className="self-start overflow-auto h-[700px] scroll-smooth">
            <h2>Objetivos</h2>
            {objectives.isLoading &&
            router.query.grade &&
            router.query.evalType &&
            router.query.core ? (
              <p>Cargando...</p>
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
      </div>
    </div>
  )
}

export default Evaluar
