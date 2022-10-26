import { useState } from 'react'
import GradeSelector from '../components/GradeSelector'
import StudentList from '../components/StudentList'
import Layout from '../components/UI/Layout'

const Agregar = () => {
  const [filter, setFilter] = useState({
    classroom: '',
    section: '',
  })

  return (
    <Layout>
      <GradeSelector />
      <StudentList />
    </Layout>
  )
}

export default Agregar
