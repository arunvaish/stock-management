import type { LoginCredentials, SignupData, AuthResponse, User } from '../types';

// Mock users database
const mockUsers: Record<string, User & { password: string }> = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    password: 'Password123!',
    createdAt: new Date().toISOString(),
  },
  manager: {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'manager',
    password: 'Manager123!',
    createdAt: new Date().toISOString(),
  },
  staff: {
    id: '3',
    username: 'staff',
    email: 'staff@example.com',
    role: 'staff',
    password: 'Staff123!',
    createdAt: new Date().toISOString(),
  },
};

// Simulate network delay
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuthApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800);

    const user = mockUsers[credentials.username];

    if (!user) {
      return {
        success: false,
        message: 'Invalid username or password',
        token: '',
        user: null as any,
      };
    }

    if (user.password !== credentials.password) {
      return {
        success: false,
        message: 'Invalid username or password',
        token: '',
        user: null as any,
      };
    }

    const token = `mock_token_${user.id}_${Date.now()}`;
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    };
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    await delay(800);

    // Check if user exists
    const existingUser = Object.values(mockUsers).find(
      (u) => u.username === data.username || u.email === data.email
    );

    if (existingUser) {
      return {
        success: false,
        message:
          existingUser.username === data.username
            ? 'Username already exists'
            : 'Email already exists',
        token: '',
        user: null as any,
      };
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: String(Object.keys(mockUsers).length + 1),
      username: data.username,
      email: data.email,
      role: 'staff',
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    mockUsers[data.username] = newUser;

    const token = `mock_token_${newUser.id}_${Date.now()}`;
    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'Signup successful',
      token,
      user: userWithoutPassword,
    };
  },

  getCurrentUser: async (token: string): Promise<User> => {
    await delay(300);

    // Find user by token (simplified)
    for (const user of Object.values(mockUsers)) {
      if (token === `mock_token_${user.id}_${Date.now()}`) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }

    throw new Error('Invalid token');
  },

  logout: async (): Promise<void> => {
    await delay(300);
    // Mock logout - in real app, invalidate token on backend
  },
};
