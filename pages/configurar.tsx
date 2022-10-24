import { Classroom } from '@prisma/client'
import prisma from '../lib/prisma'

import FlexColumn from '../components/UI/FlexColumn'
import Layout from '../components/UI/Layout'
import Section from '../components/UI/Section'
import EditSection from '../components/EditSection'

const Configurar = ({
  classrooms,
  nt1Sections,
  nt2Sections,
}: {
  classrooms: Classroom[]
  nt1Sections: Classroom[]
  nt2Sections: Classroom[]
}) => {
  const detailsText =
    'En este sección podras crear los cursos asociados a tu institución educativa , las secciones que tienes y los alumnos que asisten a cada seccion'

  const levelText =
    'Cuantos niveles vas a evaluar (por ahora tenemos kinder y prekínder por defecto)'

  return (
    <Layout>
      <FlexColumn>
        <Section title="Detalles" bodyText={detailsText} />
        <Section
          title="Secciones"
          bodyText="Cuantas secciones por nivel tienes en tu establecimiento?"
        >
          <div className="grid grid-cols-2 gap-4">
            <EditSection sections={nt1Sections} />
            <EditSection sections={nt2Sections} />
          </div>
        </Section>
      </FlexColumn>
    </Layout>
  )
}

export default Configurar

export async function getStaticProps() {
  const classrooms = await prisma.classroom.findMany()
  const nt1Sections = await prisma.classroom.findMany({
    where: {
      name: { equals: 'NT1' },
    },
    orderBy: {
      section: 'asc',
    },
  })
  const nt2Sections = await prisma.classroom.findMany({
    where: {
      name: { equals: 'NT2' },
    },
    orderBy: {
      section: 'asc',
    },
  })

  return { props: { classrooms, nt1Sections, nt2Sections } }
}
