interface Props {
  content: string
}

const TableCell = ({ content }: Props) => {
  return <td>{content}</td>
}

export default TableCell
