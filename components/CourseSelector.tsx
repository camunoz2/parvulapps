import { Classroom } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { ChildProcessWithoutNullStreams } from 'child_process'
import React, { PropsWithChildren, useState } from 'react'

const CLASSROOMS = ['NT1', 'NT2']

interface Data {
  nt1: Classroom[]
  nt2: Classroom[]
}

const CourseSelector = () => {
  const { isLoading, data } = useQuery(['sections'], getSections)
  const [isSelected, setIsSelected] = useState(false)
  const [classroom, setClassroom] = useState<string | null>(null)

  function getSections(): Promise<Data> {
    return fetch('/api/get-sections', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setIsSelected(true)
    setClassroom(event.target.value)
  }

  function currentSection(section: string): React.ReactNode {
    if (section === 'NT1') {
      return (
        <select className="border border-gray-600 p-2">
          {data?.nt1.map((item) => (
            <option key={item.id} value={item.section}>
              {item.section}
            </option>
          ))}
        </select>
      )
    }
    if (section === 'NT2') {
      return (
        <select className="border border-gray-600 p-2">
          {data?.nt2.map((item) => (
            <option key={item.id} value={item.section}>
              {item.section}
            </option>
          ))}
        </select>
      )
    }
  }

  if (isLoading) return <div>...loading</div>

  return (
    <div>
      <select
        onChange={handleChange}
        className="border border-gray-600 p-2"
      >
        <option>-- Elije un curso ---</option>
        {CLASSROOMS.map((classroom, index) => (
          <option value={classroom} key={index}>
            {classroom}
          </option>
        ))}
      </select>
      {isSelected && classroom && currentSection(classroom)}
    </div>
  )
}

export default CourseSelector
