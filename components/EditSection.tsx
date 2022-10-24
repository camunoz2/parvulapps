import { Classroom } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Snack from './UI/Snack'

interface Props {
  classrooms: Classroom[]
  name: string
  fantasyName: string
}

const EditSection = ({ classrooms, name, fantasyName }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const addSection = async () => {
    const res = await fetch('/api/addSection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classrooms,
        name,
        fantasyName,
      }),
    })

    if (res.status === 200) {
      router.replace(router.asPath)
    }
  }

  const removeSection = async (id: number) => {
    console.log(id)
    const res = await fetch('/api/removeSection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    })
    if (res.status === 200) {
      router.replace(router.asPath)
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <p>
          {name} / {fantasyName}
        </p>
        <span
          onClick={() => setIsEditing(!isEditing)}
          className="underline cursor-pointer"
        >
          Editar
        </span>
      </div>
      <div className="border border-gray-700 flex gap-2 p-2">
        {classrooms?.map((classroom) => (
          <div
            key={classroom.id}
            className="border border-gray-400 p-1 flex gap-1"
          >
            <Snack key={classroom.id}>{classroom.section}</Snack>
            {isEditing && (
              <div
                className="cursor-pointer"
                onClick={() => removeSection(classroom.id)}
              >
                X
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <div onClick={() => addSection()}>
            <Snack>+</Snack>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditSection
