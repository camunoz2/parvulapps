interface Props {
  active: boolean
  handleClick: () => void
}

const Togglable = ({active, handleClick}:Props) => {

  const style = {
   border: '1px solid red'
  }

  return(
    <div style={style} onClick={handleClick}>{active ? 'Activado' : 'Desactivado'}</div>
  )
}

export default Togglable