import React from 'react'
import { Box, Image } from '@chakra-ui/react'

export const Bio = () => {
  return (
    <Box>
      <Image
        src="/assets/images/iwt.jpg"
        alt="iwt"
        w={{ base: '100%', sm: '300px', md: 'auto' }}
      />
    </Box>
  )
}
