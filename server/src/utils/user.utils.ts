import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '3h',
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!)
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export const comparePasswords = async (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, userPassword)
}
