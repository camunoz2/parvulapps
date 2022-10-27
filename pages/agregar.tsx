import { useState } from 'react'
import GradeSelector from '../components/GradeSelector'
import StudentCreator from '../components/StudentCreator'
import StudentList from '../components/StudentList'
import Layout from '../components/UI/Layout'

const Agregar = () => {
  const [classroom, setClassroom] = useState<string | null>(null)
  const [section, setSection] = useState<string | null>(null)

  return (
    <Layout>
      <GradeSelector
        classroom={classroom}
        section={section}
        handleClassroomChange={setClassroom}
        handleSectionChange={setSection}
      />
      {classroom && section ? (
        <>
          <StudentCreator classroom={classroom} section={section} />
          <StudentList classroom={classroom} section={section} />
        </>
      ) : (
        <p>Elige la clase y la seccion😊</p>
      )}
    </Layout>
  )
}

export default Agregar
