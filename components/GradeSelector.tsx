import { Grade } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { SetStateAction, useState } from 'react'

interface Props {
  classroom: string | null
  section: string | null
  handleClassroomChange: React.Dispatch<SetStateAction<string | null>>
  handleSectionChange: React.Dispatch<SetStateAction<string | null>>
}

const GradeSelector = ({
  classroom,
  section,
  handleClassroomChange,
  handleSectionChange,
}: Props) => {
  const { isLoading, data } = useQuery(['grades'], getSections)

  const sections = data?.filter(
    (item) => item.classroom === classroom
  )

  function getSections(): Promise<Grade[]> {
    return fetch('/api/get-grades', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  if (isLoading) return <div>...loading</div>

  return (
    <div>
      <select
        onChange={(event) => {
          handleClassroomChange(event.target.value)
          handleSectionChange(null)
        }}
      >
        {!classroom && <option>---</option>}
        <option value="NT1">NT1</option>
        <option value="NT2">NT2</option>
      </select>

      <select
        onChange={(event) => {
          handleSectionChange(event.target.value)
        }}
        className="border border-gray-600 p-2"
      >
        {!section && <option>---</option>}
        {sections?.map((classroom) => (
          <option value={classroom.section} key={classroom.id}>
            {classroom.section}
          </option>
        ))}
      </select>
    </div>
  )
}

export default GradeSelector
