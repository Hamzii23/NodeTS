import { createHash } from 'crypto'
export const hashcrypto = async (token: string) => {
  const hash = createHash('sha256').update(token).digest('hex')
  return hash
}
