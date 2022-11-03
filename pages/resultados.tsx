import { useQuery } from '@tanstack/react-query'
import Layout from '../components/UI/Layout'

const Resultados = () => {
  const results = useQuery(['student-results'], () => {
    return fetch('/api/get-student-result', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  })

  if (results.isLoading) return <div>...loading</div>

  return (
    <Layout>
      <table>
        {results.data?.map((item) => (
          <tr>
            <td>{item.firsName}</td>
            {item.results.map((result) => (
              <td>{result.studentId}</td>
            ))}
          </tr>
        ))}
      </table>
    </Layout>
  )
}

export default Resultados
