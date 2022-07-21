declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    readonly MICROCMS_API_KEY: string
    readonly MICROCMS_BASE_URL: string
    readonly NEXT_PUBLIC_BASE_URL: string
    readonly NEXT_PUBLIC_GA_MEASUREMENT_ID: string
    readonly FROM_EMAIL: string
    readonly SENDMAIL_API_KEY: string
    readonly TEMPLATE_ID: string
  }
}

interface Window {
  gtag: any
}

declare const window: Window
