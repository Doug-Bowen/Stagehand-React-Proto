# Stagehand React Proto

A modern React TypeScript application with automated end-to-end testing using Playwright.

## 🚀 Tech Stack

### Frontend Application
- **React 18.2** - Modern React with concurrent features
- **TypeScript 4.9** - Type-safe JavaScript
- **MUI v5** (Material-UI) - Modern React component library
- **Emotion** - CSS-in-JS styling solution
- **SCSS** - Enhanced CSS with variables and mixins
- **React Context** - State management
- **React Hook Form** - Performant form handling
- **React Router v5** - Client-side routing
- **Azure MSAL** - Microsoft authentication library

### Development & Testing
- **React Scripts 5.0** - Modern build tooling with Webpack 5
- **Playwright** - Reliable end-to-end testing framework
- **TypeScript** - Full type checking and IntelliSense
- **ESLint** - Code quality and consistency
- **Jest** - Unit testing framework

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── containers/          # Page-level components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── styles/             # Global styles and themes
└── Routes.tsx          # Application routing

E2E/
├── fixtures/           # Test data factories and mocks
├── PageObjects/        # Page Object Model pattern
├── Tests/              # Playwright test suites
└── Utils/              # Testing utilities
```

## 🛠 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   Opens [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

### Testing

**Run E2E tests:**
```bash
npx playwright test
```

**Run unit tests:**
```bash
npm test
```

## 🏗 Architecture

### Component Design
- **Emotion Styled Components** for component-scoped styling
- **MUI v5** for consistent design system
- **TypeScript interfaces** for prop validation
- **React 18** patterns with proper children typing

### Testing Strategy
- **Page Object Model** - Maintainable test organization
- **Factory Pattern** - Dynamic test data generation
- **Playwright** - Cross-browser testing capabilities

## 🔧 Recent Updates

This project has been updated to use modern React and build tools:
- Upgraded from React 17 → React 18
- Updated Material-UI v4 → MUI v5  
- Enhanced TypeScript configuration
- Resolved Babel dependency conflicts
- Improved component prop typing for React 18

## 📜 Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run Jest unit tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 🌐 Browser Support

- Chrome (last version)
- Firefox (last version) 
- Safari (last version)
- Production builds support >0.2% usage, excluding dead browsers
