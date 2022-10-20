import { useState } from 'react'
import Togglable from './Togglable'

const ClassroomSelector = () => {
  const [activeClassrooms, setActiveClassrooms] = useState({
    nt1: true,
    nt2: true,
  })

  return (
    <div>
      <div>
        <div>NT1 / PreKinder</div>
        <Togglable
          handleClick={() =>
            setActiveClassrooms({
              ...activeClassrooms,
              nt1: !activeClassrooms.nt1,
            })
          }
          active={activeClassrooms.nt1}
        />
      </div>
      <div>
        <div>NT2 / Kinder</div>
        <Togglable
          handleClick={() =>
            setActiveClassrooms({
              ...activeClassrooms,
              nt2: !activeClassrooms.nt2,
            })
          }
          active={activeClassrooms.nt2}
        />
      </div>
    </div>
  )
}

export default ClassroomSelector
