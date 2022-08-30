import useSWR from 'swr'
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

export const fetcher = (url: string) => http.get(url).then((res) => res.data)

export const useFetcher = <T>(slug: string) => {
  const { data, error } = useSWR<T>(`/api/${slug}`, fetcher, {
    suspense: true,
  })

  return {
    data,
    error,
  }
}
