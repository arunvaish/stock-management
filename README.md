# Stock Management

This is a small stock management frontend demo built with React + Vite + TypeScript.

## Quick start

Requirements: Node.js 18+ and npm.

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project structure

- `src/` - React source files
- `public/` - static assets
- `package.json` - scripts and dependencies

## Contributing

Open a PR and include a clear description of your changes.

## License

MIT
# Stock Management System

A comprehensive React application for managing stock/inventory with role-based access control, user authentication, and a responsive dashboard.

## Features

- **User Authentication**
  - Login with username and password
  - User registration/signup
  - JWT token-based authentication
  - Form validation with error messages

- **Role-Based Dashboard**
  - Admin: Full system control and user management
  - Manager: Inventory management and reporting
  - Staff: View assigned items and perform basic operations

- **Security**
  - Protected routes based on authentication
  - Role-based access control
  - Secure localStorage token management
  - API interceptors for authentication

- **Responsive Design**
  - Mobile-friendly interface
  - Modern gradient UI
  - Smooth animations and transitions

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **API Client**: Axios
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Styling**: CSS3 with modern design patterns

## Project Structure

```
src/
├── apis/              # API service files
│   └── authApi.ts    # Authentication API calls
├── components/        # Reusable components
│   └── ProtectedRoute.tsx
├── context/           # React Context for state management
│   └── AuthContext.tsx
├── pages/             # Page components
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   └── Unauthorized.tsx
├── styles/            # CSS stylesheets
│   ├── auth.css
│   ├── dashboard.css
│   └── error.css
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions and helpers
│   └── validation.ts
├── App.tsx            # Main app component
├── App.css            # App styles
└── main.tsx           # Entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3001/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Demo Credentials

For testing purposes, use these credentials:

- **Admin**
  - Username: `admin`
  - Password: `Password123!`

- **Manager**
  - Username: `manager`
  - Password: `Manager123!`

- **Staff**
  - Username: `staff`
  - Password: `Staff123!`

## API Integration

The application expects a backend API with the following endpoints:

### Authentication Endpoints

- `POST /api/auth/login` - User login
  - Body: `{ username: string, password: string }`
  - Response: `{ success: boolean, token: string, user: User }`

- `POST /api/auth/signup` - User registration
  - Body: `{ username: string, email: string, password: string }`
  - Response: `{ success: boolean, token: string, user: User }`

- `GET /api/auth/me` - Get current user info
  - Headers: `Authorization: Bearer <token>`
  - Response: `User`

- `POST /api/auth/logout` - User logout

## Form Validation Rules

### Login Form
- Username: 3-20 characters, alphanumeric with underscores and hyphens
- Password: Minimum 6 characters

### Signup Form
- Username: 3-20 characters, alphanumeric with underscores and hyphens
- Email: Valid email format
- Password: Minimum 8 characters, must contain:
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character
- Confirm Password: Must match password field

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Real-time stock updates with WebSocket
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Two-factor authentication
- [ ] Inventory history and audit logs
- [ ] Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact support@stockmanagement.com or create an issue in the repository.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
