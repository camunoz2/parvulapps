import { Classroom } from '@prisma/client'
import prisma from '../lib/prisma'

import FlexColumn from '../components/UI/FlexColumn'
import Layout from '../components/UI/Layout'
import SectionCard from '../components/UI/SectionCard'
import EditSection from '../components/EditSection'
import Button from '../components/UI/Button'
import Link from 'next/link'

interface Props {
  classrooms: Classroom[]
  nt1Classrooms: Classroom[]
  nt2Classrooms: Classroom[]
}

const Configurar = ({
  classrooms,
  nt1Classrooms,
  nt2Classrooms,
}: Props) => {
  const detailsText =
    'En este sección podras crear los cursos asociados a tu institución educativa , las secciones que tienes y los alumnos que asisten a cada seccion'

  const levelText =
    'Cuantos niveles vas a evaluar (por ahora tenemos kinder y prekínder por defecto)'

  return (
    <Layout>
      <FlexColumn>
        <SectionCard title="Detalles" bodyText={detailsText} />
        <SectionCard
          title="Secciones"
          bodyText="Cuantas secciones por nivel tienes en tu establecimiento?"
        >
          <div className="grid grid-cols-2 gap-4">
            <EditSection
              name="NT1"
              fantasyName="PreKinder"
              classrooms={nt1Classrooms}
            />
            <EditSection
              name="NT2"
              fantasyName="Kinder"
              classrooms={nt2Classrooms}
            />
          </div>
        </SectionCard>
        <SectionCard
          title="Alumnos"
          bodyText="En esta seccion puede agregar a los alumnos a los cursos"
        >
          <Link href="/agregar">
            <a>
              <Button>Agregar</Button>
            </a>
          </Link>
        </SectionCard>
      </FlexColumn>
    </Layout>
  )
}

export default Configurar

export async function getStaticProps() {
  const classrooms = await prisma.classroom.findMany()
  const nt1Classrooms = await prisma.classroom.findMany({
    where: {
      name: {
        equals: 'NT1',
      },
    },
  })
  const nt2Classrooms = await prisma.classroom.findMany({
    where: {
      name: {
        equals: 'NT2',
      },
    },
  })

  return { props: { classrooms, nt1Classrooms, nt2Classrooms } }
}
