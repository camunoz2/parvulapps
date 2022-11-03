import { Student } from '@prisma/client'
import {
  QueryObserverSuccessResult,
  useQuery,
} from '@tanstack/react-query'
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
  students: QueryObserverSuccessResult<any, unknown>
}

const StudentList = ({
  students,
  currentSelection,
  setCurrentSelection,
}: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {students &&
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
