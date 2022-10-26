import React, { SetStateAction, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const CLASSROOMS = ['NT1', 'NT2']

const GradeSelector = ({
  filter,
  setFilter,
}: {
  filter: {
    classroom: string
    section: string
  }
  setFilter: React.Dispatch<
    SetStateAction<{
      classroom: string
      section: string
    }>
  >
}) => {
  const { isLoading, data } = useQuery(['sections'], getSections)
  const [isSelected, setIsSelected] = useState(false)
  const [classroom, setClassroom] = useState<string | null>(null)
  const [section, setSection] = useState('A')

  const router = useRouter()

  useEffect(() => {
    if (!isSelected) return
    router.replace({
      query: {
        ...router.query,
        classroomquery: classroom,
        sectionquery: section,
      },
    })
    if (classroom && section) {
      setFilter({ classroom: classroom, section: section })
    }
  }, [classroom, section])

  async function getSections() {
    return fetch('/api/get-sections', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  function handleSection(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setSection(event.target.value)
  }

  function currentSection(classroom: string): React.ReactNode {
    if (classroom === 'NT1') {
      return (
        <select
          onChange={handleSection}
          className="border border-gray-600 p-2"
        >
          {data?.nt1.map((item) => (
            <option key={item.id} value={item.section}>
              {item.section}
            </option>
          ))}
        </select>
      )
    }
    if (classroom === 'NT2') {
      return (
        <select
          onChange={handleSection}
          className="border border-gray-600 p-2"
        >
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
        onChange={(event) => {
          setIsSelected(true)
          setClassroom(event.target.value)
        }}
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

export default GradeSelector
