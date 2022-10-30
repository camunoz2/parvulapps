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

const SimpleStudentList = ({
  grade,
  currentSelection,
  setCurrentSelection,
}: Props) => {
  const students = useQuery(
    ['filtered-students'],
    (): Promise<Student[]> => {
      return fetch('/api/get-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroom: grade.classroom,
          section: grade.section,
        }),
      }).then((res) => res.json())
    }
  )

  return (
    <ul className="flex flex-col gap-2">
      {students.data?.map((student) => (
        <li
          key={student.id}
          onClick={() =>
            setCurrentSelection({
              ...currentSelection,
              student: student.id,
            })
          }
          className="p-2 border border-gray-700"
        >
          {student.name} {student.lastName}
        </li>
      ))}
    </ul>
  )
}

export default SimpleStudentList
