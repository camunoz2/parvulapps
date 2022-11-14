import Image from 'next/image'

const GradeCreator = ({ grade }: { grade: string }) => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-[#89BABB33] to-[#0EADA759] p-2 rounded">
      <div className="flex justify-between">
        <h3 className="text-base italic font-bold">{grade}</h3>
      </div>
      <div className="flex gap-2">
        <div className="relative rounded-md border border-dark p-3 bg-white">
          <div className="absolute right-2 top-2">
            <Image src="/close_icon.svg" width={20} height={20} />
          </div>
          <p className="mb-1 text-center">A</p>
          <p className="text-xs text-center">32 Alumnos</p>
        </div>

        <div className="relative flex justify-center items-center rounded-md border border-dark p-3 bg-white">
          <Image src="/add_icon.svg" width={26} height={26} />
        </div>
      </div>
    </div>
  )
}

export default GradeCreator
