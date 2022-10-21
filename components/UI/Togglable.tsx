import { useRouter } from 'next/router'

interface Props {
  on: boolean
  classroomId: number
}

const Togglable = ({ on, classroomId }: Props) => {
  const router = useRouter()

  const handleStatus = async () => {
    const toggledStatus = !on
    const res = await fetch('/api/updateClassroom', {
      method: 'POST',
      body: JSON.stringify({
        id: classroomId,
        status: toggledStatus,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      refresh()
    }
  }

  const refresh = () => {
    router.replace(router.asPath)
  }
  return (
    <div
      onClick={handleStatus}
      className="relative flex h-5 w-8 bg-gray-400 rounded-full"
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 rounded-full w-3 h-3 bg-white border border-slate-800 ${
          on ? 'right-1' : 'left-1'
        }`}
      />
    </div>
  )
}

export default Togglable
