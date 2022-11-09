import Dashed from './UI/Dashed'

const SideBar = () => {
  return (
    <div className="w-[370px] flex flex-col h-screen bg-gradient-to-br from-[#2D646533] to-[#0EADA759]">
      <div className="flex items-center gap-2">
        <img className="w-12 h-12 rounded-full bg-white border" />
        <div>
          <h3>Cristian Muñoz</h3>
          <p className="text-xs">Cerrar Sesión</p>
        </div>
      </div>

      <Dashed />

      <form>
        <div className="flex flex-col gap-1">
          <label className="font-light">Curso</label>
          <div className="flex gap-1">
            <select>
              <option>Sala Cuna</option>
            </select>
            <select>
              <option>Sala Cuna</option>
            </select>
          </div>
        </div>
      </form>

      <div className="flex gap-1">
        <img src="/settings_icon" alt="" />
        <p>Configuración</p>
      </div>
    </div>
  )
}

export default SideBar
