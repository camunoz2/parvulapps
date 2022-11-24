import { Grade, Objective, Student } from '@prisma/client'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { EvalTerms } from '../types/app'
import {
  CORES,
  EVAL_TERMS,
  MAX_SCORE,
  TOTAL_OBJECTIVE_SCORE,
} from '../utils/constants'
import CircleGraph from './CircleGraph'

interface Props {
  student: Student
  grade?: Grade
  objectives: Objective[]
  queryClient?: QueryClient
}

interface Agregate {
  parentCoreId: number
  _sum: {
    firstTermScore: number
    secondTermScore: number
    thirdTermScore: number
  }
}

const StudentCard = ({
  student,
  grade,
  objectives,
  queryClient,
}: Props) => {
  const [currentEvalTerm, setCurrentEvalTerm] = useState<EvalTerms>(
    EVAL_TERMS[0]
  )

  const coresWithLessScore = useQuery({
    queryKey: ['scores'],
    queryFn: (): Promise<Agregate[]> => {
      return fetch('/api/get-less-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
        }),
      }).then((res) => res.json())
    },
  })

  function getObjectivesScoreBy(
    filter: number,
    identifier: 'level' | 'parentCoreId'
  ) {
    const currentScore = objectives
      .filter((obj) => obj[identifier] === filter)
      .reduce(
        (prev, acc) => prev + acc[currentEvalTerm.key],

        0
      )
    const percentage = Math.floor(
      (currentScore * 100) / TOTAL_OBJECTIVE_SCORE
    )

    return percentage
  }

  function getScorePercentByCore(
    coreId: number,
    currentScore: number
  ) {
    const totalObjectivesByCore = objectives.filter(
      (obj) => obj.parentCoreId === coreId
    ).length
    const totalScoreByObjective =
      totalObjectivesByCore * MAX_SCORE[MAX_SCORE.length - 1]

    const percentage = Math.floor(
      (currentScore * 100) / totalScoreByObjective
    )

    return percentage
  }

  function sortScores() {
    const ordered = coresWithLessScore.data?.sort((a, b) => {
      return a._sum[currentEvalTerm.key] - b._sum[currentEvalTerm.key]
    })

    return ordered
  }

  if (!student) return <p>Selecciona un estudiante</p>

  return (
    <div className=" border border-accent rounded-md py-6 px-6 bg-white">
      {/* Name info */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">
            {student.name} {student.lastName}
          </h2>
          <p className="italic text-xs">
            {grade?.classroom} {grade?.section}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold self-end">{student.rut}</p>
          <div className="flex gap-1">
            {EVAL_TERMS.map((item) => (
              <button
                className={`p-1 rounded-md text-xs ${
                  item.id === currentEvalTerm.id
                    ? 'bg-accent'
                    : 'bg-slate-500'
                }`}
                onClick={() => setCurrentEvalTerm(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full border border-dashed border-accent" />
      <div className="my-3">
        <h2 className="text-sm font-bold mb-5">
          Objetivos logrados por nivel
        </h2>
        <div className="grid grid-cols-3">
          <CircleGraph
            title="Nivel 1"
            score={() => getObjectivesScoreBy(1, 'level')}
          />
          <CircleGraph
            title="Nivel 2"
            score={() => getObjectivesScoreBy(2, 'level')}
          />
          <CircleGraph
            title="Nivel 3"
            score={() => getObjectivesScoreBy(3, 'level')}
          />
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-sm font-bold mb-5">
          Desempeño por ámbitos de aprendizaje.
        </h2>
        <div className="grid grid-cols-3">
          <CircleGraph
            title="Desarrollo personal y social"
            score={() => getObjectivesScoreBy(1, 'parentCoreId')}
          />
          <CircleGraph
            title="Comunicación integral"
            score={() => getObjectivesScoreBy(2, 'parentCoreId')}
          />
          <CircleGraph
            title="Interacción y comprensión del entorno"
            score={() => getObjectivesScoreBy(3, 'parentCoreId')}
          />
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-sm font-bold mb-5">
          Núcleos mas descendidos.
        </h2>
        {coresWithLessScore.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3">
            {sortScores()?.map((score, i) => {
              if (i <= 2) {
                const coreName = CORES.find(
                  (core) => core.id === score.parentCoreId
                )?.name
                const totalCoreScore =
                  score._sum.firstTermScore +
                  score._sum.secondTermScore +
                  score._sum.thirdTermScore
                return (
                  <div className="flex gap-1">
                    <CircleGraph
                      score={() =>
                        getScorePercentByCore(
                          score.parentCoreId,
                          totalCoreScore
                        )
                      }
                      title={coreName || ''}
                    />
                  </div>
                )
              } else return
            })}
            {/* <CircleGraph
              percentage="100%"
              title="Desarrollo personal y social"
            />
            <CircleGraph
              percentage="45%"
              title="Comunicación integral"
            />
            <CircleGraph
              percentage="0%"
              title="Interacción y comprensión del entorno"
            /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentCard
