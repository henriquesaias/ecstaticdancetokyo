import { Box, Separator, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box>
      <Separator mb={8} />

      <Text mb={8} textAlign='center'><small>© {new Date().getFullYear()} Ecstatic Dance Tokyo</small></Text>
    </Box>
  )
}

export default Footer