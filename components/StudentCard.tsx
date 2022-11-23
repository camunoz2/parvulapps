import CircleGraph from './CircleGraph'

const StudentCard = () => {
  return (
    <div className=" border border-accent rounded-md py-6 px-6 bg-white">
      {/* Name info */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Tiana Quitzon</h2>
          <p className="italic text-xs">Kinder</p>
        </div>
        <div className="font-bold">23.234.567-8</div>
      </div>
      <div className="h-[1px] w-full border border-dashed border-accent" />
      <div className="my-3">
        <h2 className="text-sm font-bold mb-5">
          Objetivos logrados por nivel
        </h2>
        <div className="grid grid-cols-3">
          <CircleGraph percentage="100%" title="Nivel 1" />
          <CircleGraph percentage="45%" title="Nivel 2" />
          <CircleGraph percentage="0%" title="Nivel 3" />
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-sm font-bold mb-5">
          Desempeño por ámbitos de aprendizaje.
        </h2>
        <div className="grid grid-cols-3">
          <CircleGraph
            percentage="100%"
            title="Desarrollo personal y social"
          />
          <CircleGraph
            percentage="45%"
            title="Comunicación integral"
          />
          <CircleGraph
            percentage="0%"
            title="Interacción y comprensión del entorno"
          />
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-sm font-bold mb-5">
          Núcleos mas descendidos.
        </h2>
        <div className="grid grid-cols-3">
          <CircleGraph
            percentage="100%"
            title="Desarrollo personal y social"
          />
          <CircleGraph
            percentage="45%"
            title="Comunicación integral"
          />
          <CircleGraph
            percentage="0%"
            title="Interacción y comprensión del entorno"
          />
        </div>
      </div>
    </div>
  )
}

export default StudentCard
