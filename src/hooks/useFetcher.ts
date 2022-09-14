import useSWR from 'swr'
import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const useFetcher = <T>(slug: string) => {
  const { data, error } = useSWR<T>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${slug}`,
    fetcher,
    {
      suspense: true,
    }
  )

  return {
    data,
    error,
  }
}
