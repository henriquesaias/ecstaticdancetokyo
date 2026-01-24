import { Link as LLink } from 'react-router-dom'
import { Box, Button, Container, Image, Flex, ButtonGroup } from '@chakra-ui/react'

const Nav = () => {
  return (
    <>
      <Image
        alt="Banner image"
        src="https://principled-ethernet-41a.notion.site/image/attachment%3Aca0493df-dcbc-41d1-bc7c-910b6f844523%3Aecstatic_dance_for_notion.png?table=block&id=2c3e7ef4-828e-80d1-b00d-c1d0626cd762&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=1920&userId=&cache=v2"
        className='hero-banner'
      />

      <Flex mx="auto" maxW={800} position='relative'>
        <LLink to="/">
          <Image
            alt="Ecstatic Dance Tokyo"
            w={100}
            src="logo.webp"
            position='absolute'
            top={0}
            transform='translateY(-50%)'
            transformOrigin='center'
            borderRadius="50%"
            zIndex={2}
          />
        </LLink>
      </Flex >

      <Flex as="nav" mx="auto" maxW={800} mb={12} position="sticky" top={0} zIndex={1} backgroundColor='bg.muted' borderBottomRadius={18}>
        <Box flex="1" />

        <ButtonGroup gap={0}>
          <LLink to="/">
            <Button variant='subtle'>Home</Button>
          </LLink>
          
          <LLink to="/online-community">
            <Button variant='subtle'>Online</Button>
          </LLink>

          <LLink to="/support">
            <Button variant='subtle'>Support</Button>
          </LLink>

          <LLink>
            <Button variant='subtle' onClick={() => window.open('https://ecstaticdancetokyo.peatix.com')}>
              イベント申込み
            </Button>
          </LLink>
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default Nav