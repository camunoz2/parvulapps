import { useState } from 'react'
import GradeSelector from '../components/GradeSelector'
import StudentList from '../components/StudentList'
import Layout from '../components/UI/Layout'
import { CustomGrade } from '../types/app'

const Resultados = () => {
  const [grade, setGrade] = useState<CustomGrade>({
    classroom: null,
    section: null,
  })

  const [currentSelection, setCurrentSelection] = useState({
    term: '',
    student: 0,
    category: 0,
    core: 0,
  })

  return (
    <Layout>
      <div className="grid grid-cols-6">
        <div className="col-span-1 flex flex-col">
          <GradeSelector grade={grade} handleGradeChange={setGrade} />
          {grade?.classroom && grade?.section ? (
            <StudentList
              grade={grade}
              currentSelection={currentSelection}
              setCurrentSelection={setCurrentSelection}
            />
          ) : (
            <p>Elige la clase y la seccion😊</p>
          )}
        </div>

        <div className="col-span-5">
            

        </div>
      </div>
    </Layout>
  )
}

export default Resultados
