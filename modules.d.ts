declare namespace NodeJS {
  export interface ProcessEnv {
    DB_DATABASE: string
    DB_HOST: string
    DB_PASSWORD: string
    DB_PORT: string
    DB_USER: string
    NODE_ENV: 'development' | 'production' | 'test'
    PORT: string
  }
}

declare module 'express-async-errors' {}

declare namespace jest {
  interface Matchers<R, T> {
    toContainObject<U>(value: U): CustomMatcherResult
  }
}
