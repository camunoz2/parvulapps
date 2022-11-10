import { Grade, Objective } from '@prisma/client'
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
import { Filter } from '../types/app'

//TODO: Implement proper filter with state contained in the url

export const TERMS = ['Inicio', 'Intermedia', 'Final']

const Evaluar = () => {
  const queryClient = useQueryClient()

  const [filter, setFilter] = useState<Filter | null>()

  const [currentSelection, setCurrentSelection] = useState({
    term: '',
    student: 0,
    category: 0,
    core: 0,
  })

  const router = useRouter()

  useEffect(() => {
    router.replace('/evaluar')
  }, [])

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

        <div className="grid grid-cols-2 mt-10 gap-4">
          <div className="col-span-1">
            <h2 className="font-bold text-2xl">Sala cuna - A</h2>
          </div>

          <div className="flex justify-between col-span-1">
            <div>
              <h2 className="text-2xl font-bold">Mary Stehr</h2>
              <p className="text-xs">Sala cuna - A</p>
            </div>

            <div className="bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-4 rounded-md">
              <div className="flex items-center gap-1">
                <div className="w-10 h-2 bg-teal-300" />
                <p>Desarrollo personal y social</p>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <StudentList
              currentSelection={currentSelection}
              setCurrentSelection={setCurrentSelection}
            />
          </div>

          <div>
            <h2>
              Evaluación {router.query.evalType} / {router.query.core}
            </h2>
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
    </div>
  )
}

export default Evaluar
