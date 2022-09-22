import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button, Center, HStack, Image, VStack } from '@chakra-ui/react'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}
const WebCam = ({ imagensProps }) => {
  const [photo, setphoto] = useState([])
  const webcamRef = React.useRef(null)

  const handleClick = (imagereseve) => {
    setphoto((current) => [...current, { photo: imagereseve }])
  }

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    handleClick(imageSrc)
  }, [webcamRef])
  useEffect(() => {
    imagensProps(photo)
  }, [imagensProps, photo])

  return (
    <Center>
      <VStack>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={800}
          videoConstraints={videoConstraints}
        />
        <Button
          w="100%"
          border="2px"
          background="#0078F0"
          color="#FFF"
          _hover={{
            bg: '#fff',
            borderColor: '#0078F0',
            color: '#0078F0'
          }}
          onClick={capture}
        >
          Capturar
        </Button>
        <HStack>
          {photo.map((item, index) => (
            <Image
              key={index}
              boxSize="150px"
              objectFit="cover"
              src={item.photo}
              alt="Dan Abramov"
            />
          ))}
        </HStack>
      </VStack>
    </Center>
  )
}

export default WebCam
