import { Student } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CustomGrade } from '../types/app'

interface Selection {
  term: string
  student: number
  category: number
  core: number
}

interface Props {
  grade: CustomGrade
  currentSelection: Selection
  setCurrentSelection: React.Dispatch<Selection>
}

const StudentList = ({
  currentSelection,
  setCurrentSelection,
}: Props) => {
  const students = useQuery(['students'], () => {
    return fetch('/api/get-students').then((res) => res.json())
  })

  return (
    <ul className="flex flex-col gap-2">
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
