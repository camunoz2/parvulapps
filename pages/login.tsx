import Link from 'next/link'
import Button from '../components/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'
import Layout from '../components/UI/Layout'

const LoginPage = () => {
  return (
    <Layout>
      <CenterFull>
        <FlexColumn>
          <Heading level={1}>Iniciar Sesion</Heading>
          <Link href="/dashboard">
            <a>
              <Button>Ingresar con GMail</Button>
            </a>
          </Link>
        </FlexColumn>
      </CenterFull>
    </Layout>
  )
}

export default LoginPage
