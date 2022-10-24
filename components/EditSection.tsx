import { Classroom } from '@prisma/client'
import Snack from './UI/Snack'

const EditSection = ({ sections }: { sections: Classroom[] }) => {
  return (
    <div>
      <div className="flex gap-2">
        <p>NT1/ Prekinder</p>
        <span>Editar</span>
      </div>
      <div className="border border-gray-700 flex gap-2 p-2">
        {sections?.map((item) => (
          <Snack>{item.section}</Snack>
        ))}
        <Snack>+</Snack>
      </div>
    </div>
  )
}

export default EditSection
