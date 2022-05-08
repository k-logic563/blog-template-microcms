declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    readonly NEXT_PUBLIC_MICROCMS_API_KEY: string
    readonly NEXT_PUBLIC_MICROCMS_BASE_URL: string
    readonly NEXT_PUBLIC_BASE_URL: string
  }
}
