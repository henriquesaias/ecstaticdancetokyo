import { Link as LLink } from 'react-router-dom'
import { Box, Button, Image, Flex, ButtonGroup } from '@chakra-ui/react'

const Nav = () => {
  return (
    <>
      <Image
        alt="Banner image"
        src="topbanner.webp"
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

      <Flex as="nav" mx="auto" maxW={787} mb={12} position="sticky" top={0} zIndex={1} backgroundColor='bg.muted' borderBottomRadius={18} boxShadow='md'>
        <Box flex="1" />

        <ButtonGroup gap={0}>
          <LLink to="/online-community">
            <Button
              variant='subtle'
              borderRadius={0}
              backgroundColor='#f06e06'
              _hover={{ backgroundColor: '#85340b' }}

            >
              オンライン
            </Button>
          </LLink>

          <LLink to="/support">
            <Button
              variant='subtle'
              borderRadius={0}
              backgroundColor='#d34802'
              _hover={{ backgroundColor: '#85340b' }}
            >
              無料相談
            </Button>
          </LLink>

          <LLink>
            <Button
              variant='subtle'
              borderRadius={0}
              borderBottomRightRadius={18}
              backgroundColor='#a72902'
              _hover={{ backgroundColor: '#85340b' }}
              onClick={() => window.open('https://ecstaticdancetokyo.peatix.com')}
            >
              イベント申込み
            </Button>
          </LLink>
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default Nav