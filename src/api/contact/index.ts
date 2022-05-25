import { DefineMethods } from 'aspida'

type Req = {
  name: string
  email: string
  contents: string
}

type Res = {
  status: number
  message: string
}

export type Methods = DefineMethods<{
  post: {
    reqBody: Req
    resBody: Res
  }
}>
