import Image from 'next/image'

const Dashed = () => {
  return (
    <div className="flex justify-center">
      <Image src="/dashed.svg" width={1366} height={1} alt="" />
    </div>
  )
}

export default Dashed
