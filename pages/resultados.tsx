import { useQuery } from '@tanstack/react-query'
import Layout from '../components/UI/Layout'
import type { Curriculum, Response } from '../types/app'

const Resultados = () => {
  const results = useQuery(['student-results'], () => {
    return fetch('/api/get-student-result', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()) as Promise<Response>
  })
  const curriculum = useQuery(['curriculum'], () => {
    return fetch('/api/get-curriculum', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()) as Promise<Curriculum>
  })

  if (results.isLoading) return <div>...loading</div>

  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>Alumnos</th>
            {curriculum.isLoading
              ? '...loading'
              : curriculum.data?.cores.map((item) => (
                  <th key={item.id}>{item.description}</th>
                ))}
          </tr>
        </thead>

        <tbody></tbody>
      </table>
    </Layout>
  )
}

export default Resultados
