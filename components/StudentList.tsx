import { Student } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

interface Props {
  currentSelection: number
  setCurrentSelection: React.Dispatch<React.SetStateAction<number>>
}

const StudentList = ({
  currentSelection,
  setCurrentSelection,
}: Props) => {
  const router = useRouter()

  const students = useQuery(['students', router.query.grade], () => {
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
    <ul className="flex flex-col gap-1 overflow-auto h-[700px] scroll-smooth">
      {students.isSuccess &&
        students.data?.map((student: Student) => (
          <li
            key={student.id}
            onClick={() => setCurrentSelection(student.id)}
            className={`p-2 border border-accent rounded-md ${
              currentSelection === student.id ? 'bg-green-400' : ''
            }`}
          >
            {student.name} {student.lastName}
          </li>
        ))}
    </ul>
  )
}

export default StudentList
