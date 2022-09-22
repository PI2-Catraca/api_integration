import { Grid, GridItem, HStack, Box } from '@chakra-ui/react'
import Sidebar from 'components/Sidebar'

export default function Home({ children }) {
  return (
    <Grid
      minH="100%"
      h="100%"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
    >
      <GridItem padding="5px" rowSpan={2} colSpan={1}>
        <Sidebar
          // eslint-disable-next-line react/no-children-prop
          children={undefined}
        />
      </GridItem>
      <GridItem h="100%" w="100%" colSpan={4}>
        <Box p={4} color="black" borderWidth="1px" borderRadius="lg">
          <HStack h="100%" w="100%">
            {children}
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  )
}
