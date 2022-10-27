interface Props {
  content: string
}

const TableCell = ({ content }: Props) => {
  return <td className="border border-gray-800">{content}</td>
}

export default TableCell
