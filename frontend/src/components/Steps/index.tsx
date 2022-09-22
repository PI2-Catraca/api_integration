import { Button, Flex, Heading, Input, Spinner } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { FiClipboard, FiUser } from 'react-icons/fi'
import { BiFingerprint } from 'react-icons/bi'
import WebCam from 'components/WebCam'
import Form from 'components/Form'
import { useEffect, useState } from 'react'
import axios from 'axios'
const steps = [
  { label: 'Login', icon: FiUser },
  { label: 'Verification', icon: FiClipboard },
  { label: 'Digital', icon: BiFingerprint }
]

async function PostUser(allinfo) {
 
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/usuario/novo`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      administrador: false,
      senha: '',
      cpf: allinfo[0].cpf,
      nome: allinfo[0].name,
      biometria: allinfo[1].biometria,
      fotos: allinfo[0].allphoto

    }
  }
  console.log("options",options)
  await axios
    .request(options)
    .then((response) => console.log(response))
    .catch((error) => error)
}

export const GridSteps = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0
  })
  const [postList, setPostList] = useState([])
  const [allinfo, setAllInfo] = useState([])
  const [listImages, setListImages] = useState([])
  const [postFinger, setPostFinger] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    activeStep === 1 ? setAllInfo(postList) : []
    activeStep === 2
      ? setAllInfo(Object.assign(allinfo, { allphoto: listImages }))
      : []

    activeStep === 3 ? PostUser(allinfo) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])
  const addPostlist = (postitem) => setPostList(postitem)
  const addImages = (postitem) => setListImages(postitem)
  function ClearAll() {
    setAllInfo([])
    setPostList([])
    reset(0)
  }
  const addFinger = async () => {
    var options = {method: 'GET', url: 'http://localhost:8001/getDat'};

    setIsLoading(true)
    const response = await axios.request(options).then( (response)=> setAllInfo(allinfo => [allinfo, response.data])
    ).catch(function (error) {
      console.error(error);
    });
    setIsLoading(false)
    console.log(response);
    // () => setAllInfo(allinfo => [...allinfo, fifi])
  }
  
  return (
    <Flex flexDir="column" width="100%">
      <Steps activeStep={activeStep} m="10px">
        <Step label="Login" key="1" icon={FiUser}>
          <Form InfoForm={addPostlist} />
        </Step>
        <Step label="Verification" key="2" icon={FiClipboard}>
          <WebCam imagensProps={addImages} />
        </Step>
        <Step label="Digital" key="3" icon={BiFingerprint}>
        <Button onClick={addFinger} colorScheme='teal' w="200px" disabled={isLoading}>
          Cadastra Digital
          {
            isLoading ?
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='md'
            />  
            :
            <div></div>
          }
        </Button>

        {
          isLoading ?
          <h3>
            Coloque o dedo sobre o sensor, aguarde alguns segundos, e remova o dedo. Repita o processo.
          </h3>
          :
          <div></div>
        }
        </Step>
      </Steps>
      {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Cadastro realizado com sucesso
          </Heading>
          <Button
            mx="auto"
            mt={6}
            size="sm"
            onClick={() => {
              ClearAll()
            }}
          >
            Novo Cadastro
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end" marginTop="10px">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Voltar
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Cadastra' : 'Próximo'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default GridSteps
