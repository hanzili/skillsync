import UserService from '../../src/services/user.service'
import UserDao from '../../src/dao/user.dao'
import { IUser } from '../../src/models/User'

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

      expect(token).toBeDefined()
    })
  })

  describe('changeUserInfo', () => {
    it('should throw an error if the user is not found', async () => {
      ;(UserDao.updateUser as jest.Mock).mockResolvedValueOnce(null)

      await expect(
        UserService.changeUserInfo('12345', { username: 'newUsername' }),
      ).rejects.toThrow('User not found')
    })

    it('should successfully update user information', async () => {
      const updatedUser = { id: '12345', username: 'newUsername' }
      ;(UserDao.updateUser as jest.Mock).mockResolvedValueOnce(updatedUser)

      const result = await UserService.changeUserInfo('12345', {
        username: 'newUsername',
      })
      expect(result).toEqual(updatedUser)
    })
  })

  describe('deleteUser', () => {
    it('should throw an error if the user is not found', async () => {
      ;(UserDao.deleteUser as jest.Mock).mockResolvedValueOnce(null)

      await expect(UserService.deleteUser('12345')).rejects.toThrow(
        'User not found',
      )
    })

    it('should successfully delete a user', async () => {
      const deletedUser = { id: '12345', username: 'testuser' }
      ;(UserDao.deleteUser as jest.Mock).mockResolvedValueOnce(deletedUser)

      const result = await UserService.deleteUser('12345')
      expect(result).toEqual(deletedUser)
    })
  })

  describe('authorize', () => {
    it('should return true if user has required role', async () => {
      const userId = 'someUserId'
      const requiredRoles = ['admin']
      const mockUser: Partial<IUser> = {
        role: 'admin',
      }
      UserDao.findUserById = jest.fn().mockResolvedValue(mockUser as IUser)

      const result = await UserService.authorize(userId, requiredRoles)

      expect(result).toBe(true)
    })

    it('should return false if user does not have required role', async () => {
      const userId = 'someUserId'
      const requiredRoles = ['admin']
      const mockUser: Partial<IUser> = {
        role: 'user',
      }
      UserDao.findUserById = jest.fn().mockResolvedValue(mockUser as IUser)

      const result = await UserService.authorize(userId, requiredRoles)

      expect(result).toBe(false)
    })

    it('should throw an error if user is not found', async () => {
      const userId = 'someUserId'
      const requiredRoles = ['admin']
      UserDao.findUserById = jest.fn().mockResolvedValue(null)

      await expect(
        UserService.authorize(userId, requiredRoles),
      ).rejects.toThrow('User not found')
    })
  })
})
