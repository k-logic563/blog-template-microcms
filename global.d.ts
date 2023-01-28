declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    readonly MICROCMS_API_KEY: string
    readonly MICROCMS_DOMAIN: string
    readonly MICROCMS_CACHE_KEY: string
  }
}
