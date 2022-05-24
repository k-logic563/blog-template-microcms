import { DefineMethods } from 'aspida'

type Props = {
  name: string
  email: string
  contents: string
}

export type Methods = DefineMethods<{
  post: {
    reqBody: Props
  }
}>
