import { Grade } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

const GradeSelector = () => {
  const [section, setSection] = useState('NT1')
  const router = useRouter()

  const { isLoading, data } = useQuery(['grades'], getSections)

  const nt1Sections = data?.filter(
    (item) => item.classroom === section
  )
  const nt2Sections = data?.filter(
    (item) => item.classroom === section
  )

  const sections = section === 'NT1' ? nt1Sections : nt2Sections

  function getSections(): Promise<Grade[]> {
    return fetch('/api/get-grades', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  if (isLoading) return <div>...loading</div>

  return (
    <div>
      <select onChange={(event) => setSection(event.target.value)}>
        <option value="NT1">NT1</option>
        <option value="NT2">NT2</option>
      </select>

      <select className="border border-gray-600 p-2">
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
