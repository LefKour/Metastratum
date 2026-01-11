# Tests

This directory contains all test files for the Metastratum platform.

## Structure

```
tests/
├── unit/                   # Unit tests
│   ├── analysis/          # Analysis algorithm tests
│   ├── terrain/           # Terrain processing tests
│   ├── map/               # Map functionality tests
│   └── utils/             # Utility function tests
├── integration/            # Integration tests
│   ├── workflow/          # End-to-end workflow tests
│   └── api/               # API integration tests
├── fixtures/               # Test data and fixtures
└── mocks/                  # Mock implementations
```

## Testing Strategy

### Unit Tests
- Test individual functions and components in isolation
- Fast execution
- High coverage of edge cases
- Located in `tests/unit/`

### Integration Tests
- Test interactions between modules
- Verify data flows through the system
- Test API integrations
- Located in `tests/integration/`

### Test Fixtures
- Sample DEM data
- Mock API responses
- Test meshes and geometries
- Located in `tests/fixtures/`

### Mocks
- Mock implementations of external services
- Mock Three.js objects
- Mock Leaflet maps
- Located in `tests/mocks/`

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- src/analysis/elevation/slope.test.ts
```

## Writing Tests

### Test File Naming
- Unit tests: `[filename].test.ts`
- Integration tests: `[feature].integration.test.ts`
- Place tests adjacent to source files or in `tests/` directory

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { functionToTest } from '@/module/function';

describe('functionToTest', () => {
  beforeEach(() => {
    // Setup
  });

  it('should handle basic case', () => {
    const result = functionToTest(input);
    expect(result).toBe(expected);
  });

  it('should handle edge case', () => {
    // Test edge cases
  });

  it('should throw on invalid input', () => {
    expect(() => functionToTest(invalid)).toThrow();
  });
});
```

### Best Practices

1. **Descriptive Names**: Test names should clearly describe what is being tested
2. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification
3. **Isolated Tests**: Tests should not depend on each other
4. **Edge Cases**: Test boundary conditions and error cases
5. **Fast Tests**: Keep unit tests fast (< 100ms per test)
6. **Readable Assertions**: Use clear, specific assertions

### Testing Analysis Algorithms

For analysis algorithms, include tests for:
- Correctness with known input/output pairs
- Performance with large datasets
- Edge cases (flat terrain, steep slopes, etc.)
- Invalid input handling
- Numerical precision

Example:
```typescript
describe('calculateSlope', () => {
  it('should return 0 for flat terrain', () => {
    const flatDEM = createFlatDEM(100, 100, 500);
    const slope = calculateSlope(flatDEM);
    expect(slope.every(v => v === 0)).toBe(true);
  });

  it('should calculate correct slope for known gradient', () => {
    const dem = createLinearGradient(10, 10, 0, 100);
    const slope = calculateSlope(dem);
    // Verify against known values
  });
});
```

## Coverage Goals

- Overall coverage: > 80%
- Analysis algorithms: > 90%
- Utility functions: > 95%
- UI components: > 70%

## Continuous Integration

Tests are automatically run on:
- Pull requests
- Commits to main branch
- Pre-commit hooks (optional)

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Test Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
