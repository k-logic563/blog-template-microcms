export interface IFormInputs {
  name: string
  email: string
  message: string
}

export type FieldNames = keyof IFormInputs

export type Mode = 'init' | 'pending' | 'done'
