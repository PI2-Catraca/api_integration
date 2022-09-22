import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import DisplayAdmin from '../../components/DisplayAdmin'
import GridSteps from 'components/Steps'

export default function DisplayCadastro() {
  return (
    <DisplayAdmin>
      <GridSteps></GridSteps>
    </DisplayAdmin>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctf) => {
  const { ['nextauth.token']: token } = parseCookies(ctf)
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
