import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface Props {
  classroomName: string
  setClassroomState: React.Dispatch<React.SetStateAction<boolean>>
  classroomState: boolean
}

const Togglable = ({
  classroomName,
  setClassroomState,
  classroomState,
}: Props) => {
  const router = useRouter()

  const handleClassroomState = async () => {
    setClassroomState(!classroomState)
  }

  const refresh = () => {
    router.replace(router.asPath)
  }
  return (
    <div
      onClick={handleClassroomState}
      className="relative flex h-5 w-8 bg-gray-400 rounded-full"
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 rounded-full w-3 h-3 bg-white border border-slate-800 ${
          classroomState ? 'right-1' : 'left-1'
        }`}
      />
    </div>
  )
}

export default Togglable
