interface Props {
  text: string
  name: string
}

const TextInput = ({ text, name }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="name">{text}</label>
      <input
        className="border border-gray-400"
        type="text"
        name={name}
      />
    </div>
  )
}

export default TextInput
