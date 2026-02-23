// ============================================
// MOCK BACKEND IMPLEMENTATION EXAMPLE
// ============================================
// This file shows how to implement the backend API
// that the React frontend expects.
//
// You can use this with Node.js/Express, or adapt it
// to your preferred backend framework.

// ============================================
// User Types
// ============================================
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  password: string; // Should be hashed in real implementation
  createdAt: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: Omit<User, 'password'>;
}

// ============================================
// Mock Database
// ============================================
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    password: 'Password123!', // In real app: hash this with bcrypt
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'manager',
    password: 'Manager123!',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'staff',
    email: 'staff@example.com',
    role: 'staff',
    password: 'Staff123!',
    createdAt: new Date().toISOString(),
  },
];

// ============================================
// ENDPOINT IMPLEMENTATIONS
// ============================================

// POST /api/auth/login
export async function handleLogin(username: string, password: string): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find user
  const user = mockUsers.find((u) => u.username === username);

  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password',
      token: '',
      user: undefined as any,
    };
  }

  // Check password (in real app: use bcrypt.compare)
  if (user.password !== password) {
    return {
      success: false,
      message: 'Invalid username or password',
      token: '',
      user: undefined as any,
    };
  }

  // Generate JWT token (in real app: use jsonwebtoken)
  const token = `mock_jwt_token_${user.id}_${Date.now()}`;

  const { password: _, ...userWithoutPassword } = user;

  return {
    success: true,
    message: 'Login successful',
    token,
    user: userWithoutPassword,
  };
}

// POST /api/auth/signup
export async function handleSignup(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if user exists
  const existingUser = mockUsers.find((u) => u.username === username || u.email === email);

  if (existingUser) {
    return {
      success: false,
      message: username === existingUser.username ? 'Username already exists' : 'Email already exists',
      token: '',
      user: undefined as any,
    };
  }

  // Create new user
  const newUser: User = {
    id: String(mockUsers.length + 1),
    username,
    email,
    role: 'staff', // Default role for new users
    password: password, // In real app: hash this
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  // Generate JWT token
  const token = `mock_jwt_token_${newUser.id}_${Date.now()}`;

  const { password: _, ...userWithoutPassword } = newUser;

  return {
    success: true,
    message: 'Signup successful',
    token,
    user: userWithoutPassword,
  };
}

// GET /api/auth/me
export async function handleGetCurrentUser(token: string): Promise<Omit<User, 'password'> | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In real app: verify and decode JWT token
  if (!token.startsWith('mock_jwt_token_')) {
    return null;
  }

  // Extract user ID from token (this is simplified)
  const userIdMatch = token.match(/mock_jwt_token_(\d+)/);
  if (!userIdMatch) {
    return null;
  }

  const userId = userIdMatch[1];
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// POST /api/auth/logout
export async function handleLogout(token: string): Promise<{ success: boolean; message: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In real app: invalidate token in blacklist/database
  return {
    success: true,
    message: 'Logout successful',
  };
}

// ============================================
// EXPRESS.JS EXAMPLE
// ============================================
/*
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to extract and verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify token (simplified)
  if (!token.startsWith('mock_jwt_token_')) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await handleLogin(username, password);
  res.status(result.success ? 200 : 401).json(result);
});

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const result = await handleSignup(username, email, password);
  res.status(result.success ? 201 : 400).json(result);
});

// Get current user endpoint
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  const user = await handleGetCurrentUser(token);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Logout endpoint
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  const result = await handleLogout(token);
  res.json(result);
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
*/
