import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Text } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

const ErrorMessage = () => {
  return <Text>whoops,looks like something went wrong</Text>
}

export const ErrorWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>{children}</ErrorBoundary>
  )
}
