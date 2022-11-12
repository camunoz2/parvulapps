import { useQuery } from '@tanstack/react-query'
import type { Response } from '../types/app'

const ResultsTable = () => {
  const results = useQuery(['student-results'], () => {
    return fetch('/api/get-student-result', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()) as Promise<Response>
  })

  if (results.isLoading) return <p>Loading...</p>

  return (
    <table>
      <thead className="bg-gradient-to-br from-[#c1d3d0] to-[#8bf3f0] sticky top-0">
        <tr>
          <th className="p-2 bg-white">Alumnos</th>
          {results.isLoading
            ? '...loading'
            : results.data?.cores.map((item) => (
                <th
                  key={item.id}
                  className="text-sm text-center font-light px-2 py-4"
                >
                  {item.description}
                </th>
              ))}
        </tr>
      </thead>

      <tbody>
        {results.data?.students.map((student) => {
          return (
            <tr
              key={student.id}
              className="divide-y divide-dashed divide-x-0 hover:bg-gradient-to-br hover:from-[#c1d3d0] hover:to-[#9e8bf3]"
            >
              <td className="p-2 text-left">
                {`${student.name} ${student.lastName}`}
              </td>
              {results.data?.sum
                .filter((sum) => sum.studentId === student.id)
                .map((res) => (
                  <td key={res._sum.id} className="p-2 text-center">
                    {res._sum.firstTermScore}
                  </td>
                ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ResultsTable
