import { LockIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  Stack,
  VStack
} from '@chakra-ui/react'
import { AuthContext } from 'context/AuthContext'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { handleSubmit, register } = useForm()
  // const { response, setresponse } = useState(true)
  const { SignIn } = useContext(AuthContext)

  async function onSubmit(data) {
    await SignIn(data)
  }

  return (
    <ChakraProvider>
      <Modal
        isOpen
        // eslint-disable-next-line react/no-children-prop
        size="full"
      >
        <ModalContent h="100%">
          <Center h="100%" color="white">
            <Box
              bg="#ffff"
              color="#000"
              w="450px"
              h="550px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="40px"
              boxShadow="xl"
              rounded="xl"
            >
              <VStack h="100%" spacing="auto" align="center">
                <Heading color="#0078F0">Login</Heading>
                <Avatar bg="#0078F0" />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack w="100%" spacing={5}>
                    <InputGroup>
                      <Input
                        variant="flushed"
                        placeholder="E-mail"
                        {...register('email', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4'
                          }
                        })}
                      />
                      <InputRightElement
                        // eslint-disable-next-line react/no-children-prop
                        children={<LockIcon color="#0078F0" />}
                      />
                    </InputGroup>
                    <InputGroup>
                      <Input
                        variant="flushed"
                        placeholder="Senha"
                        type="password"
                        {...register('password', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4'
                          }
                        })}
                      />
                      
                      <InputRightElement
                        // eslint-disable-next-line react/no-children-prop
                        children={<LockIcon color="#0078F0" />}
                      />
                    </InputGroup>
                  </Stack>
                  <br />
                  <Button
                    type="submit"
                    w="100%"
                    color="#0078F0"
                    border="2px"
                    borderColor="#0078F0"
                    _hover={{
                      background: '#0078F0',
                      color: '#FFF'
                    }}
                  >
                    ENTRAR
                  </Button>
                </form>
                {/* {response === false ? (
                  <Box bg="red" w="100%" p={4} color="white">
                    Algo deu errado, tente novamente
                  </Box>
                ) : (
                  []
                )} */}
              </VStack>
            </Box>
          </Center>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

export default Login
