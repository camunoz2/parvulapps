import { Grade, Student } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

interface Selection {
  term: string
  student: number
  category: number
  core: number
}

interface Props {
  currentSelection: Selection
  setCurrentSelection: React.Dispatch<Selection>
}

const StudentList = ({
  currentSelection,
  setCurrentSelection,
}: Props) => {
  const router = useRouter()

  const students = useQuery(['students', router.query], () => {
    return fetch('/api/get-students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grade: parseInt(router.query.grade as string),
      }),
    }).then((res) => res.json())
  })

  return (
    <ul className="flex flex-col gap-2 overflow-auto h-[700px] scroll-smooth">
      {students.isSuccess &&
        students.data?.map((student: Student) => (
          <li
            key={student.id}
            onClick={() =>
              setCurrentSelection({
                ...currentSelection,
                student: student.id,
              })
            }
            className={`p-2 border border-gray-700 ${
              currentSelection.student === student.id
                ? 'bg-green-400'
                : ''
            }`}
          >
            {student.name} {student.lastName}
          </li>
        ))}
    </ul>
  )
}

export default StudentList
