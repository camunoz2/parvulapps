const Card = ({ item = '+' }) => {
  return (
    <div className="p-4 border border-gray-700 rounded-sm w-16 text-center">
      {item}
    </div>
  )
}

const SectionAdder = ({ sections }: { sections: string[] }) => {
  return (
    <div className="flex gap-1 border border-gray-700 p-2">
      {sections.map((item, index) => (
        <Card key={index} item={item} />
      ))}
      <Card />
    </div>
  )
}

export default SectionAdder
