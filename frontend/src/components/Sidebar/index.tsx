import React, { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Avatar,
  VStack
} from '@chakra-ui/react'
import { FiHome, FiTrendingUp, FiMenu } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { ReactText } from 'react'
import { destroyCookie } from 'nookies'
import Router, { useRouter } from 'next/router'
interface LinkItemProps {
  name: string
  icon: IconType
  to: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Cadastro', icon: FiHome, to: 'cadastro' },
  { name: 'Relatório', icon: FiTrendingUp, to: 'relatorio' }
  // { name: 'Notificação', icon: FiBell, to: 'notificacao' }
]
function logout() {
  destroyCookie({}, 'nextauth.token')
  Router.push('/')
}
export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100%">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="white"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        w="100%"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Avatar name="A D" src="https://bit.ly/broken-link" />
        <VStack align="baseline">
          <Text fontSize="md" fontFamily="monospace" fontWeight="bold">
            Admin
          </Text>
          <Text fontSize="sm" fontFamily="monospace">
            admin@demo.com
          </Text>
        </VStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />

        <IconButton
          variant="outline"
          onClick={logout}
          aria-label="logout"
          _hover={{
            bg: '#0078F0',
            color: 'white'
          }}
          icon={<BiLogOut />}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  href: string
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  const router = useRouter()

  const isActive = router.pathname === `/admin/${href}`
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#0078F0',
          color: 'white'
        }}
        __css={isActive ? { bg: '#0078F0', color: 'white' } : ''}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}
