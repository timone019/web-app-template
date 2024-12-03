# Modern React Web Application

A feature-rich, responsive web application built with React, TypeScript, and Material UI. This application provides a comprehensive user interface with authentication, dashboard, and various utility features.

## ✨ Features

- 🎨 Modern Material UI Design
- 🔐 Complete Authentication Flow
  - Login & Registration
  - Password Recovery
  - Two-Factor Authentication
- 👤 User Account Management
  - Profile Settings
  - Security Settings
  - Payment Methods
  - Order History
- 📊 Interactive Dashboard
- 📱 Fully Responsive Design
- 🔍 Search Functionality
- 📄 Static Pages (About, Terms, Privacy)
- 🌙 Dark/Light Theme Support
- 🌐 Client-Side Routing
- 📝 Form Validation
- 🔔 Toast Notifications

## 🛠️ Tech Stack

- **React 18** - Modern UI development
- **TypeScript** - Type-safe code
- **Material UI v5** - UI component library
- **React Router v6** - Client-side routing
- **Formik & Yup** - Form handling and validation
- **Axios** - API requests
- **Context API** - State management
- **React Query** - Server state management

## 📁 Project Structure
```
src/
├── components/       # Reusable UI components
├── contexts/        # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── account/     # Account-related pages
│   ├── auth/        # Authentication pages
│   └── dashboard/   # Dashboard components
├── services/        # API services
├── theme/           # Material UI theme configuration
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build production bundle
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🌐 Backend Integration

This frontend application is designed to work with a RESTful API backend. The API endpoints are configured in `src/services/api.ts`. For local development without a backend, the application uses mock data and simulated responses.

To connect to a backend server:
1. Configure the API base URL in `.env`:
   ```
   REACT_APP_API_URL=http://your-api-url
   ```
2. Ensure all API endpoints match your backend routes

## 🚀 Deployment

This application is configured for deployment on GitHub Pages:

1. Update `package.json` with your repository URL:
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name"
   }
   ```
2. Build and deploy:
   ```bash
   npm run build
   ```

## 🎨 Customization

### Theme
The application theme can be customized in `src/theme/theme.ts`. It supports both light and dark modes with easy color palette modification.

### Components
All components are built with Material UI and can be customized using the theme or component-specific props.

## 📝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
