import { Student } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

const StudentList = () => {
  const { isLoading, data } = useQuery(['students'], getStudents)

  async function getStudents(): Promise<Student[]> {
    return fetch('/api/get-students', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  }

  if (isLoading) return <p>...loading</p>

  return (
    <table className="border border-gray-800">
      <thead>
        <tr>
          <td className="border border-gray-800">Nombre</td>
          <td className="border border-gray-800">Apellido</td>
          <td className="border border-gray-800">RUT</td>
        </tr>
      </thead>
      <tbody>
        {data?.map((student) => (
          <tr key={student.id}>
            <td className="border border-gray-800">{student.name}</td>
            <td className="border border-gray-800">
              {student.lastName}
            </td>
            <td className="border border-gray-800">{student.rut}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentList
