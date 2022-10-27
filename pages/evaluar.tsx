import { Student } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Layout from '../components/UI/Layout'

const Evaluar = () => {
  const [students, setStudents] = useState<Student[]>([])

  const { isLoading, data } = useQuery(
    ['filtered-students'],
    (): Promise<Student[]> =>
      fetch('/api/get-students', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json())
  )

  useEffect(() => {
    console.log('asd')
  }, [students])

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const reg = new RegExp(event.target.value, 'gi')
    if (data && event.target.value.length > 0) {
      const filtered = data.filter(
        (item) => item.name.match(reg) || item.lastName.match(reg)
      )
      setStudents(filtered)
    } else setStudents([])
  }

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <div>
          <div className="flex flex-col">
            <label>Buscar</label>
            <input
              className="border border-gray-600"
              onChange={handleSearch}
              type="search"
            />
            <ul className="border border-gray-600">
              {isLoading ? (
                <li>'loading data...'</li>
              ) : (
                students.map((student) => (
                  <li
                    className="hover:bg-gray-600 hover:text-gray-100 py-1 px-2"
                    key={student.id}
                  >
                    {student.name}
                  </li>
                ))
              )}
            </ul>
          </div>

          <h2>Tipo de evaluacion</h2>
          <div className="flex flex-row gap-1">
            <span className="p-1 border border-gray-600">
              inicial
            </span>
            <span className="p-1 border border-gray-600">
              intermedia
            </span>
            <span className="p-1 border border-gray-600">final</span>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2>Ambitos de aprendizaje</h2>
              <div className="border border-gray-700 p-2 flex justify-between">
                <div>
                  <p>Desarrollo personal y social</p>
                  <div>1/3</div>
                </div>
              </div>
            </div>

            <div>
              <h2>Nucleos de aprendizaje</h2>
              <div className="border border-gray-700 p-2 flex justify-between">
                <div>
                  <p>Identidad y autonomia</p>
                  <div>1/3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Evaluar
