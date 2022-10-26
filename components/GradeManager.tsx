import { Grade } from '@prisma/client'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import Snack from './UI/Snack'

const GradeManager = ({ name }: { name: string }) => {
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(
    ['grades'],
    (): Promise<Grade[]> =>
      fetch('/api/get-grades', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  const [isEditing, setIsEditing] = useState(false)
  const classrooms = data?.filter((item) => item.classroom === name)

  const addGradeMutation = useMutation(
    () =>
      fetch('/api/add-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      }),
    { onSuccess: () => queryClient.invalidateQueries(['grades']) }
  )

  const removeGradeMutation = useMutation(
    (id: number) =>
      fetch('/api/remove-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
        }),
      }),
    { onSuccess: () => queryClient.invalidateQueries(['grades']) }
  )

  if (isLoading) return <p>loading...</p>

  return (
    <div>
      <div className="flex gap-2">
        <p>{name}</p>
        <span
          onClick={() => setIsEditing(!isEditing)}
          className="underline cursor-pointer"
        >
          Editar
        </span>
      </div>
      <div className="border border-gray-700 flex gap-2 p-2 flex-wrap">
        {classrooms?.map((item) => (
          <div
            key={item.id}
            className="border border-gray-400 p-1 flex"
          >
            <Snack key={item.id}>{item.section}</Snack>
            {isEditing && (
              <div
                className="cursor-pointer"
                onClick={() => removeGradeMutation.mutate(item.id)}
              >
                X
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <div onClick={() => addGradeMutation.mutate()}>
            <Snack>+</Snack>
          </div>
        )}
      </div>
    </div>
  )
}

export default GradeManager
