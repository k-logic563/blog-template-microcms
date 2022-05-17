import { useBreakpointValue } from '@chakra-ui/react'

export const useBreakpoint = () => {
  return useBreakpointValue({ base: true, md: false })
}
