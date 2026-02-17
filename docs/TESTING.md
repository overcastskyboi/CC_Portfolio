# CherryOS Testing Protocols

This document outlines the testing procedures and protocols for ensuring the quality and reliability of CherryOS.

## Table of Contents

1. [Testing Strategy](#testing-strategy)
2. [Unit Testing](#unit-testing)
3. [Component Testing](#component-testing)
4. [Integration Testing](#integration-testing)
5. [End-to-End Testing](#end-to-end-testing)
6. [Cross-Browser Testing](#cross-browser-testing)
7. [Performance Testing](#performance-testing)
8. [Accessibility Testing](#accessibility-testing)
9. [Security Testing](#security-testing)
10. [Continuous Integration](#continuous-integration)

## Testing Strategy

CherryOS follows a layered testing approach:

1. **Unit Tests**: Test individual functions and utilities
2. **Component Tests**: Test React components in isolation
3. **Integration Tests**: Test interactions between components
4. **End-to-End Tests**: Test complete user workflows
5. **Manual Testing**: Human verification of UX and edge cases

## Unit Testing

Unit tests focus on pure functions, utilities, and helper functions.

### Setup

Install testing dependencies:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Example Test Structure

```javascript
// utils/formatTime.test.js
import { formatTime } from './formatTime';

describe('formatTime', () => {
  test('formats seconds correctly', () => {
    expect(formatTime(90)).toBe('1:30');
  });
  
  test('handles zero correctly', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});
```

### What to Unit Test

- Utility functions
- Helper functions
- Pure functions without side effects
- Data transformation functions

### Running Unit Tests

```bash
npm run test:unit
```

Or for continuous testing:
```bash
npm run test:unit -- --watch
```

## Component Testing

Component tests verify that individual React components render correctly and handle user interactions.

### Setup

Using React Testing Library:
```bash
npm install --save-dev @testing-library/react @testing-library/user-event
```

### Example Component Test

```javascript
// components/DesktopIcon.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DesktopIcon from './DesktopIcon';
import { Terminal } from 'lucide-react';

describe('DesktopIcon', () => {
  test('renders icon and label', () => {
    render(
      <DesktopIcon 
        icon={Terminal} 
        label="Terminal" 
        onClick={() => {}} 
      />
    );
    
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <DesktopIcon 
        icon={Terminal} 
        label="Terminal" 
        onClick={handleClick} 
      />
    );
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### What to Component Test

- Rendering with different props
- User interactions (clicks, typing, etc.)
- State changes
- Conditional rendering
- Accessibility attributes

### Running Component Tests

```bash
npm run test:components
```

## Integration Testing

Integration tests verify that multiple components work together correctly.

### Example Integration Test

```javascript
// integration/windowManagement.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('Window Management', () => {
  test('opens window when desktop icon is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Click on Terminal icon
    await user.click(screen.getByText('Terminal'));
    
    // Verify window is opened
    expect(screen.getByText('Terminal')).toBeInTheDocument();
  });
  
  test('can minimize and restore window', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Open window
    await user.click(screen.getByText('Terminal'));
    
    // Minimize window
    await user.click(screen.getByLabelText('Minimize'));
    
    // Verify window is minimized
    // Check taskbar for minimized window
  });
});
```

### What to Integration Test

- Component interactions
- Context provider functionality
- Complex user workflows
- State management across components

### Running Integration Tests

```bash
npm run test:integration
```

## End-to-End Testing

End-to-end tests simulate real user scenarios across the entire application.

### Setup

Using Cypress:
```bash
npm install --save-dev cypress
```

### Example E2E Test

```javascript
// cypress/e2e/desktop.cy.js
describe('Desktop Experience', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('completes boot sequence', () => {
    // Wait for boot to complete
    cy.contains('CHERRY OS').should('be.visible');
    
    // Click to unlock
    cy.get('[data-testid="lockscreen"]').click();
    
    // Verify desktop is visible
    cy.contains('My Songs').should('be.visible');
  });
  
  it('opens and interacts with Terminal app', () => {
    // Unlock desktop
    cy.get('[data-testid="lockscreen"]').click();
    
    // Open Terminal
    cy.contains('Terminal').click();
    
    // Type command
    cy.get('[data-testid="terminal-input"]')
      .type('help{enter}');
      
    // Verify output
    cy.contains('Commands:').should('be.visible');
  });
});
```

### What to E2E Test

- Complete user journeys
- Critical business flows
- Multi-page navigation
- External service integrations

### Running E2E Tests

```bash
npm run test:e2e
```

Or open Cypress UI:
```bash
npm run test:e2e:open
```

## Cross-Browser Testing

Ensure CherryOS works across different browsers and devices.

### Supported Browsers

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Testing Process

1. Manual testing on supported browsers
2. Automated testing with BrowserStack or Sauce Labs
3. Visual regression testing

### Responsive Testing

Test on various screen sizes:
- Mobile (320px, 375px, 414px)
- Tablet (768px, 1024px)
- Desktop (1280px, 1440px, 1920px)

## Performance Testing

Monitor and optimize performance metrics.

### Metrics to Track

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### Tools

- Lighthouse audits
- WebPageTest.org
- Chrome DevTools Performance panel

### Performance Testing Script

```javascript
// performance/test-performance.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', port: chrome.port};
  const runnerResult = await lighthouse(url, options);
  
  // Assert performance metrics
  const categories = runnerResult.lhr.categories;
  expect(categories.performance.score).toBeGreaterThan(0.9);
  
  await chrome.kill();
}
```

## Accessibility Testing

Ensure CherryOS is accessible to all users.

### Automated Testing

Using axe-core with Jest:
```bash
npm install --save-dev axe-core jest-axe
```

```javascript
// accessibility.test.js
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const wrapper = render(<App />);
  const results = await axe(wrapper.container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus management

### WCAG Compliance

Target WCAG 2.1 Level AA compliance:
- Perceivable
- Operable
- Understandable
- Robust

## Security Testing

Identify and mitigate security vulnerabilities.

### Dependency Scanning

```bash
npm audit
```

### Security Headers Testing

Verify security headers are properly configured:
- Content Security Policy (CSP)
- XSS Protection
- Frame Options
- Strict Transport Security

### Penetration Testing

Regular penetration testing for:
- Input validation
- Authentication mechanisms
- Authorization controls
- Session management

## Continuous Integration

Automated testing in CI/CD pipeline.

### GitHub Actions Workflow

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run unit tests
      run: npm run test:unit -- --coverage
      
    - name: Run component tests
      run: npm run test:components
      
    - name: Run linting
      run: npm run lint
      
    - name: Upload coverage
      uses: codecov/codecov-action@v1
```

### Test Coverage Requirements

Minimum coverage thresholds:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## Test Reporting

Generate comprehensive test reports.

### Coverage Reports

- Istanbul/nyc for JavaScript coverage
- Generate HTML reports for easy viewing
- Track coverage trends over time

### Test Results Dashboard

- Aggregate results from all test types
- Display pass/fail rates
- Show performance metrics
- Highlight flaky tests

## Maintenance and Updates

Regular testing maintenance:

1. Update test dependencies
2. Review and update test cases
3. Add tests for new features
4. Remove obsolete tests
5. Refactor tests for improved clarity

## Troubleshooting Common Issues

### Flaky Tests

- Use deterministic data
- Mock external dependencies
- Avoid race conditions
- Use appropriate waits

### Slow Tests

- Parallelize test execution
- Optimize setup/teardown
- Use focused tests for development
- Profile slow tests

### False Positives/Negatives

- Validate test assertions
- Check test environment consistency
- Review mocking strategies
- Ensure proper cleanup

## Conclusion

Following these testing protocols ensures that CherryOS maintains high quality and reliability. Regular testing helps catch issues early and provides confidence in deployments.