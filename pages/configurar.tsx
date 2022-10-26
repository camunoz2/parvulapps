import FlexColumn from '../components/UI/FlexColumn'
import Layout from '../components/UI/Layout'
import SectionCard from '../components/UI/SectionCard'
import GradeManager from '../components/GradeManager'
import Button from '../components/UI/Button'
import Link from 'next/link'

const Configurar = () => {
  const detailsText =
    'En este sección podras crear los cursos asociados a tu institución educativa , las secciones que tienes y los alumnos que asisten a cada seccion'

  const levelText =
    'Cuantos niveles vas a evaluar (por ahora tenemos kinder y prekínder por defecto)'

  return (
    <Layout>
      <FlexColumn>
        <SectionCard title="Detalles" bodyText={detailsText} />
        <SectionCard title="Secciones" bodyText={levelText}>
          <div className="grid grid-cols-2 gap-4">
            <GradeManager name="NT1" />
            <GradeManager name="NT2" />
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
