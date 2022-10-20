const Separator = ({ gap }: { gap: number }) => {
  switch (gap) {
    case 1:
      return <div className="my-8" />
    case 2:
      return <div className="my-10" />
    case 3:
      return <div className="my-16" />
    case 4:
      return <div className="my-24" />
    default:
      return <div className="my-2" />
  }
}

export default Separator
