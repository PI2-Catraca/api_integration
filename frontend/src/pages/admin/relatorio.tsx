import DisplayAdmin from '../../components/DisplayAdmin'
import GridSteps from 'components/Table'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import axios from 'axios'

export default function DisplayCadastro({ data }) {
  return (
    <DisplayAdmin>
      <GridSteps dataTable={data} />
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
  const options = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_URL}/usuario/todos`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const data = await axios
    .request(options)
    .then((response) => response.data.data)
    .catch(function (error) {
      console.error(error)
    })

  return {
    props: {
      data: data
    }
  }
}
