# Stagehand Demo

A demonstration application showcasing **[Stagehand](https://github.com/browserbase/stagehand)** - an AI-powered browser automation framework. This repository provides a comprehensive testing playground with 60+ Material-UI components to demonstrate Stagehand's capabilities for intelligent test automation.

## 🎯 What is This?

This demo application serves two purposes:

1. **Showcase Stagehand**: Demonstrate how to use Stagehand's AI-powered browser automation with `act()`, `extract()`, `observe()`, and `agent` capabilities
2. **Testing Playground**: Provide a rich UI with diverse components (forms, tables, dialogs, etc.) for practicing automated testing

## 🤖 What is Stagehand?

[Stagehand](https://github.com/browserbase/stagehand) is an AI-powered browser automation framework that uses natural language to interact with web applications. Instead of writing brittle selectors, you describe what you want to do in plain English:

```typescript
// Traditional Playwright
await page.locator('#firstName').fill('John');

// Stagehand - AI figures out which field to fill
await page.act('Fill the First Name field with "John"');
```

### Key Stagehand Features Demonstrated

- **`act()`** - Perform actions using natural language ("click the submit button")
- **`extract()`** - Extract data from pages using AI ("get the user's name from the table")
- **`observe()`** - Understand page state and context
- **`agent`** - Autonomous multi-step task execution

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- OpenAI API key (for Stagehand AI features)

### Installation

1. **Clone and install:**
   ```bash
   git clone https://github.com/Doug-Bowen/Stagehand-Demo.git
   cd Stagehand-Demo
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

4. **Run Stagehand tests:**
   ```bash
   npx playwright test
   ```

## 📚 Example Tests

The demo includes several Stagehand test examples in `E2E/Tests/landing_page.spec.ts`:

### Using `extract()` to Get Data
```typescript
// Extract file count from the UI using AI
const fileData = await page.extract(
    "Look for the total number of files displayed",
    z.object({ totalFiles: z.number() })
);
expect(fileData.totalFiles).toBe(86);
```

### Using `act()` for Interactions
```typescript
// Fill form fields using natural language
await page.act('Fill the First Name field with "Alice"');
await page.act('Fill the Last Name field with "Johnson"');
await page.act('Fill the Comments field with "Test comment"');
```

### Using `agent` for Autonomous Tasks
```typescript
// Agent autonomously figures out how to complete the task
await page.agent.execute('Fill out the Input Controls Form with sample data');
```

## 🎨 Application Features

The demo app includes 4 tabs with diverse UI components:

- **Form Controls**: Text fields, autocomplete, checkboxes, sliders, radio buttons, date pickers
- **Data Display**: Tables with sorting/filtering, progress bars, chips, badges, avatars
- **Navigation**: Lists, steppers, accordions, breadcrumbs
- **Feedback**: Alerts, dialogs, snackbars, notifications

## 📁 Project Structure

```
Stagehand-Demo/
├── src/                      # React application
│   ├── containers/
│   │   └── Dashboard/        # Main UI components showcase
│   ├── components/           # Reusable components
│   └── contexts/             # React contexts
│
├── E2E/                      # Stagehand test suite
│   ├── Tests/                # Test specifications
│   │   └── landing_page.spec.ts  # Example Stagehand tests
│   └── Utils/                # Test utilities
│       ├── stagehand.util.ts     # Stagehand configuration
│       ├── prompts.ts            # Reusable test prompts
│       └── navigation.util.ts    # Navigation helpers
│
└── playwright.config.ts      # Playwright configuration
```

## 🔧 Tech Stack

**Frontend:**
- React 18.2 + TypeScript
- Material-UI (MUI) v5.18
- React Router

**Testing:**
- **[@browserbasehq/stagehand](https://www.npmjs.com/package/@browserbasehq/stagehand)** - AI-powered automation
- Playwright - Browser automation foundation
- Zod - Schema validation for `extract()`

## 📖 Learning Resources

- **Stagehand Documentation**: [https://github.com/browserbase/stagehand](https://github.com/browserbase/stagehand)
- **Stagehand NPM Package**: [@browserbasehq/stagehand](https://www.npmjs.com/package/@browserbasehq/stagehand)
- **Test Examples**: See `E2E/Tests/landing_page.spec.ts` for practical examples

## 🎯 Use Cases

This demo is perfect for:

- **Learning Stagehand**: Hands-on examples of AI-powered test automation
- **Testing Workshops**: Ready-to-use application for teaching test automation
- **Proof of Concepts**: Demonstrate Stagehand capabilities to stakeholders
- **Test Development**: Practice writing Stagehand tests against a stable UI

## 🤝 Contributing

This is a demo repository. Feel free to fork and experiment with your own Stagehand test scenarios!

## 📄 License

This project is for demonstration purposes. See individual dependencies for their licenses.
