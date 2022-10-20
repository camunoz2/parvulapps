import Button from '../components/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'

const LoginPage = () => {
  return (
    <CenterFull>
      <FlexColumn>
        <Heading level={1}>Iniciar Sesion</Heading>
        <Button>Ingresar con GMail</Button>
      </FlexColumn>
    </CenterFull>
  )
}

export default LoginPage
