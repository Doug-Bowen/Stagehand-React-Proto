# React Controls Demo

A comprehensive Material-UI component showcase built with React and TypeScript, designed for automated testing and component exploration.

## 🎯 Purpose

This application serves as a **testing playground** and **component library showcase** featuring 60+ Material-UI components organized in an interactive dashboard. Perfect for:

- **Automated Testing**: Stagehand, Playwright, and other testing frameworks
- **Component Exploration**: Interactive examples of MUI components
- **Visual Regression Testing**: Comprehensive UI component coverage
- **Accessibility Testing**: Properly labeled and structured components
- **Development Reference**: Real-world component implementations

## 🚀 Tech Stack

### Frontend Application
- **React 18.2** - Modern React with concurrent features
- **TypeScript 4.9** - Type-safe JavaScript
- **MUI v5.18** (Material-UI) - Comprehensive React component library
- **MUI Icons v5.18** - Material Design icon library
- **Emotion 11.14** - CSS-in-JS styling solution for custom components
- **React Router v5.2** - Client-side routing

### Development & Testing
- **React Scripts 5.0** - Modern build tooling with Webpack 5 and hot reloading
- **Playwright 1.15** - Cross-browser end-to-end testing framework
- **TypeScript** - Static type checking and enhanced IntelliSense
- **ESLint** - Code quality and consistency enforcement
- **Jest & React Testing Library** - Unit and integration testing

## 🎨 Featured Components

The dashboard showcases components organized in 4 interactive tabs:

### **Tab 1: Form Controls**
- **Input Components**: TextField (text, email, multiline), Autocomplete
- **Selection Controls**: Select, Radio Groups, Checkboxes, Switches  
- **Interactive Elements**: Sliders, Ratings, Toggle Button Groups
- **Button Variations**: Primary, Secondary, Success, Warning, Error
- **Icon Buttons**: Edit, Delete, Share with tooltips

### **Tab 2: Data Display**
- **Data Tables**: Complete tables with sorting, avatars, and actions
- **Progress Indicators**: Linear & Circular progress, loading states
- **Visual Elements**: Chips, Badges, Avatars in various styles
- **Loading States**: Skeleton components for content loading

### **Tab 3: Navigation**
- **Lists**: Interactive list items with icons and descriptions
- **Steppers**: Multi-step workflow visualization
- **Accordions**: Expandable content sections
- **Breadcrumbs**: Hierarchical navigation

### **Tab 4: Feedback**
- **Alerts**: Success, Info, Warning, Error message types
- **Dialogs**: Modal dialogs with form interactions
- **Snackbars**: Toast-style notifications

### **Additional Features**
- **Floating Action Buttons**: Fixed position primary actions
- **Speed Dial**: Multi-action floating menus
- **Stats Cards**: Dashboard metrics with icons
- **Interactive Forms**: Complete form workflows

## 📁 Project Structure

```
src/
├── components/
│   └── ErrorBoundary/      # Error handling component
├── containers/
│   └── Dashboard/          # Main MUI components showcase
├── contexts/
│   └── Authentication/     # Simplified auth context
├── styles/                 # Global styles and themes
├── App.tsx                 # Main application component
├── Routes.tsx              # Application routing
└── index.tsx               # Application entry point

E2E/
├── fixtures/               # Test data factories and mocks
├── PageObjects/           # Page Object Model pattern
├── Tests/                 # Playwright test suites
└── Utils/                 # Testing utilities
```

## 🛠 Getting Started

### Prerequisites
- Node.js 16+ 
- npm

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

## 🧪 Testing Features

This demo is optimized for automated testing with:

- **Semantic HTML**: Proper labels, ARIA attributes, and accessible markup
- **Consistent Selectors**: Predictable element identification
- **Interactive Elements**: All components support user interactions
- **Loading States**: Dynamic content and async operations
- **Form Validation**: Real form behaviors for testing
- **Navigation Patterns**: Single-page app routing
- **Responsive Design**: Mobile and desktop layouts

## 🏗 Architecture

### Component Design
- **MUI v5** components with consistent theming
- **TypeScript interfaces** for comprehensive prop validation
- **React 18** patterns with proper children typing
- **Emotion styled components** for custom styling
- **Simplified routing** focused on component showcase

## 📜 Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run Jest unit tests
- `npx playwright test` - Run E2E tests

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 🎯 Use Cases

- **Stagehand Testing**: Comprehensive component interactions
- **Playwright Automation**: Cross-browser testing scenarios
- **Visual Testing**: Screenshot and visual regression testing
- **Accessibility Audits**: WCAG compliance testing
- **Component Documentation**: Live examples of MUI components
- **Development Reference**: Implementation patterns and best practices
