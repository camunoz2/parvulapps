import { useState } from 'react'
import GradeSelector from '../components/GradeSelector'
import StudentCreator from '../components/StudentCreator'
import EditableStudentList from '../components/EditableStudentList'
import Layout from '../components/UI/Layout'
import { CustomGrade } from '../types/app'

const Agregar = () => {
  const [grade, setGrade] = useState<CustomGrade>({
    classroom: null,
    section: null,
  })

  return (
    <Layout>
      <GradeSelector grade={grade} handleGradeChange={setGrade} />
      {grade?.classroom && grade?.section ? (
        <>
          <StudentCreator
            classroom={grade.classroom}
            section={grade.section}
          />
          <EditableStudentList
            classroom={grade.classroom}
            section={grade.section}
          />
        </>
      ) : (
        <p>Elige la clase y la seccion😊</p>
      )}
    </Layout>
  )
}

export default Agregar
