# Contribution Guidelines

We value your participation in the JSON Prompt Generator project! This guide will help you understand how to get involved and make meaningful contributions.

## Quick Start Guide for New Contributors

If you're new to open source, welcome! We're here to help you get started. Join our community and feel free to ask questions.

### Ways to Contribute

You can contribute to the project in many ways:

1. 🐛 Report bugs or issues
2. 💡 Suggest new features
3. 📝 Improve documentation
4. 🔧 Submit code improvements
5. ✅ Add new test cases
6. 🎨 Enhance UI/UX
7. 💬 Help other users in discussions
8. 🌐 Add internationalization support

### Why Contribute to JSON Prompt Generator?

- **Learn Modern Tech Stack**: Work with React, TypeScript, Python, and Flask
- **Gain Experience**: Perfect for both beginners and experienced developers
- **Community Support**: Get guidance from maintainers and other contributors
- **Make an Impact**: Help others work more efficiently with JSON prompts

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- Python 3.x
- Git

### Setting Up the Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/JSON-Prompt-Generator.git
   ```
3. Set up the backend:
   ```bash
   cd JSON-Prompt-Generator/backend
   pip install -r requirements.txt
   ```
4. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Development Workflow

### Running the Application Locally

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bug-fix
   ```

2. Make your changes
3. Test your changes thoroughly
4. Commit your changes with clear, descriptive commit messages
5. Push to your fork
6. Create a Pull Request

## Pull Request Guidelines

### Before Opening a PR

We prefer smaller, focused PRs over large ones because:
- They're easier to review and merge
- They reduce the chance of conflicts
- They make tracking changes simpler
- They get feedback faster

### We Do Not Accept PRs That:
- Only refactor code without adding value
- Only update dependencies
- Make large-scale changes without prior discussion

### PR Requirements

✅ Each PR should:
- Focus on a single feature or fix
- Include a clear description of changes
- Reference related issues (#issue-number)
- Update documentation when needed
- Add relevant tests
- Pass all existing tests
- Follow code style guidelines
- Include screenshots for UI changes

### PR Process

1. 🔀 Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   # or
   git checkout -b fix/your-bug-fix
   ```
2. 💻 Make your changes
3. ✅ Test thoroughly
4. 📝 Write clear commit messages
5. 🔄 Push changes
6. 📫 Create PR with clear title and description

## Code Style Guidelines

### Python (Backend)

- Follow PEP 8 style guide
- Use meaningful variable and function names
- Include docstrings for functions and classes
- Keep functions focused and concise

### TypeScript/React (Frontend)

- Use TypeScript for type safety
- Follow the established project structure
- Use functional components with hooks
- Follow React best practices
- Use meaningful component names
- Keep components focused and reusable

## Testing Guide

### Backend Testing (Python/Flask)

#### Setting Up Test Environment
```bash
cd backend
pip install pytest pytest-cov
```

#### Writing Tests
- Create tests in `tests/` directory
- Name files with `test_` prefix
- Test one component per file
- Use descriptive test names

#### Running Tests
```bash
# Run all tests
python -m pytest

# Run with coverage report
python -m pytest --cov=app

# Run specific test file
python -m pytest tests/test_specific_file.py
```

### Frontend Testing (React/TypeScript)

#### Setting Up Test Environment
```bash
cd frontend
npm install --save-dev jest @testing-library/react
```

#### Writing Tests
- Create tests next to components
- Use `.test.tsx` or `.spec.tsx` extension
- Test component behavior
- Mock API calls

#### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- YourComponent.test.tsx
```

### What to Test

#### Backend
- API endpoints
- Data validation
- Error handling
- JSON conversion logic
- Edge cases

#### Frontend
- Component rendering
- User interactions
- State management
- API integration
- Error states
- Responsive design

## Documentation

- Update README.md if needed
- Document new features
- Add JSDoc comments for TypeScript functions
- Include comments for complex logic

## Issue Guidelines

### Before Creating an Issue

We don't assign issues to specific people because:
- It keeps the project welcoming and inclusive
- Anyone can work on any open issue
- It prevents bottlenecks from inactive contributors
- It encourages community collaboration
- It allows for flexible contribution schedules

### When Creating an Issue

1. 🔍 Check if a similar issue already exists
2. 📋 Use a clear, descriptive title
3. 🐞 For bugs, provide:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, etc.)
4. ✨ For feature requests:
   - Describe the problem you're solving
   - Explain your proposed solution
   - Include mockups/examples if possible
5. 📝 Use issue templates when available

### Good First Issues

Look for issues tagged with:
- `good-first-issue`
- `documentation`
- `bug-fix-easy`
- `ui-improvement`

## Communication

- Be respectful and constructive
- Ask questions in Discussions
- Report bugs in Issues
- Propose features in Discussions first

## License

By contributing to this project, you agree that your contributions will be licensed under its MIT license.

## Questions?

If you have any questions or need help, feel free to:
1. Open a Discussion
2. Ask in Issues
3. Contact the maintainers

Thank you for contributing to JSON Prompt Generator!
