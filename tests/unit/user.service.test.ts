import UserService from '../../src/services/user.service'
import UserDao from '../../src/dao/user.dao'
import { IUser } from '../../src/models/User'
import jwt, { JwtPayload } from 'jsonwebtoken'

// Mocking UserDao
jest.mock('../../src/dao/user.dao')

const mockUserDao = UserDao as jest.Mocked<typeof UserDao>

describe('UserService', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret'
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a user and return a token', async () => {
      const mockUserData = {
        id: 'fakeUserId',
        username: 'testUser',
        email: 'test1@example.com',
        password: 'password123',
      }
      mockUserDao.createUser.mockResolvedValue(mockUserData as IUser)

      const token = await UserService.register(
        mockUserData.username,
        mockUserData.email,
        mockUserData.password,
      )

      expect(token).toBeDefined()
    })
  })

  describe('login', () => {
    it('should return a valid token for valid credentials', async () => {
      const mockUserData = {
        email: 'test1@example.com',
        password: 'password123',
      }
      const userId = 'someUserId'
      const mockUser = {
        _id: userId,
        comparePassword: jest.fn().mockResolvedValue(true),
      } as unknown as IUser
      mockUserDao.findUserByEmail.mockResolvedValue(mockUser)

      const token = await UserService.login(
        mockUserData.email,
        mockUserData.password,
      )

      // Decode the token to check if it has the correct userId
      const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload
      expect(decoded.userId).toEqual(userId)
      expect(mockUserDao.findUserByEmail).toHaveBeenCalledWith(
        mockUserData.email,
      )
      expect(mockUser.comparePassword).toHaveBeenCalledWith(
        mockUserData.password,
      )
    })

    it('should return null for invalid credentials', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'wrongPassword',
      }
      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      } as unknown as IUser
      mockUserDao.findUserByEmail.mockResolvedValue(mockUser)

      const token = await UserService.login(
        mockUserData.email,
        mockUserData.password,
      )

      expect(token).toBeNull()
      expect(mockUserDao.findUserByEmail).toHaveBeenCalledWith(
        mockUserData.email,
      )
      expect(mockUser.comparePassword).toHaveBeenCalledWith(
        mockUserData.password,
      )
    })

    it('should return null for non-existent email', async () => {
      const mockUserData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      }
      mockUserDao.findUserByEmail.mockResolvedValue(null)

      const token = await UserService.login(
        mockUserData.email,
        mockUserData.password,
      )

      expect(token).toBeNull()
      expect(mockUserDao.findUserByEmail).toHaveBeenCalledWith(
        mockUserData.email,
      )
    })
  })
})
