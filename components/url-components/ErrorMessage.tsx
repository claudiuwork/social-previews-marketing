import { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null

  return <div>{children}</div>
}

export default ErrorMessage
