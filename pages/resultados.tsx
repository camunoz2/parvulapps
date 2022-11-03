import { useQuery } from '@tanstack/react-query'
import Layout from '../components/UI/Layout'
import type { Curriculum, Response } from '../types/app'

const Resultados = () => {
  const results = useQuery(['student-results'], () => {
    return fetch('/api/get-student-result', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()) as Promise<Response>
  })
  const curriculum = useQuery(['curriculum'], () => {
    return fetch('/api/get-curriculum', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()) as Promise<Curriculum>
  })

  if (results.isLoading) return <div>...loading</div>

  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th className="p-2 border border-gray-400">Alumnos</th>
            {curriculum.isLoading
              ? '...loading'
              : curriculum.data?.cores.map((item) => (
                  <th
                    key={item.id}
                    className="p-2 border border-gray-400"
                  >
                    {item.description}
                  </th>
                ))}
          </tr>
        </thead>

        <tbody>
          {results.data?.students.map((student) => {
            return (
              <tr key={student.id}>
                <td className="p-2 border border-gray-400">
                  {student.name} {student.lastName}
                </td>
                {results.data?.sum
                  .filter((sum) => sum.studentId === student.id)
                  .map((res) => (
                    <td
                      key={res._sum.id}
                      className="p-2 border border-gray-400"
                    >
                      {res._sum.firstTermScore}
                    </td>
                  ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export default Resultados
