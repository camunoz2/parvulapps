declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT: string
      GOOGLE_SECRET: string
      DATABASE_URL: string
      MY_GOOGLE_ID: string
    }
  }
}
export {}
