import type { Student } from '@prisma/client'

interface Props {
  text: string
  name: string
  value: string
  handleChange: React.Dispatch<React.SetStateAction<Student>>
  student: Student
}

const TextInput = ({
  text,
  name,
  value,
  handleChange,
  student,
}: Props) => {
  const setValue = () => {
    handleChange({
      ...student,
      [name]: value,
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="name">{text}</label>
      <input
        title={name}
        onChange={setValue}
        className="border border-gray-400"
        type="text"
        name={name}
        value={value}
      />
    </div>
  )
}

export default TextInput
