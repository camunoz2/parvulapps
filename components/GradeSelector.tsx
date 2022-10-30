import { Grade } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { SetStateAction, useState } from 'react'
import { CustomGrade } from '../types/app'

interface Props {
  grade: CustomGrade
  handleGradeChange: React.Dispatch<SetStateAction<CustomGrade>>
}

const GradeSelector = ({ grade, handleGradeChange }: Props) => {
  const { isLoading, data } = useQuery(['grades'], getSections)

  const sections = data?.filter(
    (item) => item.classroom === grade?.classroom
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
          handleGradeChange({
            ...grade,
            classroom: event.target.value,
            section: '',
          })
        }}
      >
        {!grade?.classroom && <option>---</option>}
        <option value="NT1">NT1</option>
        <option value="NT2">NT2</option>
      </select>

      <select
        onChange={(event) => {
          handleGradeChange({
            ...grade,
            section: event.target.value,
          })
        }}
        className="border border-gray-600 p-2"
      >
        {!grade?.section && <option>---</option>}
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
