import type { Classroom } from '@prisma/client'
import prisma from '../lib/prisma'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Layout from '../components/UI/Layout'
import Section from '../components/UI/Section'
import Text from '../components/UI/Text'
import FlexRow from '../components/UI/FlexRow'
import Togglable from '../components/UI/Togglable'

const Configurar = ({ classrooms }: { classrooms: Classroom[] }) => {
  const detailsText =
    'En este sección podras crear los cursos asociados a tu institución educativa , las secciones que tienes y los alumnos que asisten a cada seccion'

  const levelText =
    'Cuantos niveles vas a evaluar (por ahora tenemos kinder y prekínder por defecto)'

  return (
    <Layout>
      <CenterFull>
        <FlexColumn>
          <Section title="Detalles" bodyText={detailsText} />
          <Section title="Niveles" bodyText={levelText}>
            {classrooms ? (
              classrooms.map((classroom) => (
                <FlexRow key={classroom.id}>
                  <Text>
                    {classroom.name} / {classroom.fantasyName}
                  </Text>
                  <Togglable
                    classroomId={classroom.id}
                    on={classroom.status}
                  />
                </FlexRow>
              ))
            ) : (
              <p>...loading</p>
            )}
          </Section>
        </FlexColumn>
      </CenterFull>
    </Layout>
  )
}

export default Configurar

export async function getStaticProps() {
  const classrooms = await prisma.classroom.findMany()

  return { props: { classrooms } }
}
