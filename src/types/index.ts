export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Staff' | 'Manager' | 'AGM' | 'Plant Head' | 'Director/MD' | 'Admin';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  lastUpdated: string;
}
