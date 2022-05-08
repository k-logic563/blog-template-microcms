import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './blogs'
import type { Methods as Methods1 } from './blogs/_id@string'
import type { Methods as Methods2 } from './categories'
import type { Methods as Methods3 } from './tags'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/blogs'
  const PATH1 = '/categories'
  const PATH2 = '/tags'
  const GET = 'GET'

  return {
    blogs: {
      _id: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          get: (
            option?:
              | {
                  query?: Methods1['get']['query'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<Methods1['get']['resBody']>(
              prefix,
              prefix1,
              GET,
              option
            ).json(),
          $get: (
            option?:
              | {
                  query?: Methods1['get']['query'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<Methods1['get']['resBody']>(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          $path: (
            option?:
              | { method?: 'get' | undefined; query: Methods1['get']['query'] }
              | undefined
          ) =>
            `${prefix}${prefix1}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        }
      },
      get: (
        option?:
          | {
              query?: Methods0['get']['query'] | undefined
              config?: T | undefined
            }
          | undefined
      ) => fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (
        option?:
          | {
              query?: Methods0['get']['query'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | { method?: 'get' | undefined; query: Methods0['get']['query'] }
          | undefined
      ) =>
        `${prefix}${PATH0}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    categories: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods2['get']['resBody']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods2['get']['resBody']>(prefix, PATH1, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    tags: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods3['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods3['get']['resBody']>(prefix, PATH2, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
