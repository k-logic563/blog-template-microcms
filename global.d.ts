declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    readonly MICROCMS_API_KEY: string
    readonly MICROCMS_DOMAIN: string
    readonly NEXT_PUBLIC_BASE_URL: string
  }
}
