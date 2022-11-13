import Layout from '../components/UI/Layout'
import Image from 'next/image'

const Configurar = () => {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <h2 className="text-2xl font-bold">Detalles</h2>
          <p className="text-xl mb-4">
            En este sección podras crear los cursos asociados a tu
            institución educativa , las secciones que tienes y los
            alumnos que asisten a cada seccion
          </p>
          <h2 className="text-2xl font-bold">Secciones</h2>
          <p className="text-xl mb-4">
            Configura las secciones por nivel que quieres agregar
          </p>
          {/* Seccion 1 */}
          <div className="flex flex-col bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-2 rounded">
            <div className="flex justify-between">
              <h3 className="text-base italic">Sala cuna</h3>
              <div className="bg-accent p-1 flex gap-1 items-center">
                <p className="text-xs">editar</p>
                <Image src="/edit_icon.svg" width={18} height={18} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="rounded-md border border-dark p-3">
                <p className="mb-1 text-center">A</p>
                <p className="text-xs text-center">32 alumnos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Configurar
