# Metastratum

Interactive web-based terrain analysis platform demonstrating computational geometry, GIS algorithms, and real-time 3D graphics expertise.

## Overview

Metastratum enables users to select a bounding box on a map interface to extract Digital Elevation Model (DEM) data as a 3D mesh with heightmap textures. The application performs comprehensive geospatial analyses and visualizes results in an interactive 3D environment.

## Features

### Phase 1: Foundation (In Development)
- Interactive map interface with bounding box selection (Leaflet)
- DEM data fetching from terrain services
- 3D mesh generation with heightmap textures
- Basic 3D visualization (Three.js/WebGPU)

### Phase 2: Core Analysis (Planned)
- **Elevation Analysis**: Slope, aspect, concavity, roughness
- **Hillshade Generation**: Realistic terrain shading
- **Contour Extraction**: Elevation contour lines
- **Spot Elevation Tools**: Point, path, and grid sampling

### Phase 3: Advanced Analysis (Planned)
- **Hydrology**: Flow direction, accumulation, watershed delineation
- **Visibility Analysis**: Viewshed and line-of-sight calculations
- **Path Analysis**: Straight distance and least-cost pathfinding
- **Cut/Fill Calculations**: Volume analysis for terrain modification

### Phase 4: Export & Polish (Planned)
- Export results in multiple formats (GeoTIFF, OBJ, STL, glTF, GeoJSON)
- Comprehensive UI/UX refinements
- Documentation and usage examples

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **3D Graphics**: Three.js with @react-three/fiber and WebGPU support
- **Mapping**: Leaflet, React-Leaflet
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest with coverage
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier

## Getting Started

### Prerequisites
- Node.js 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/metastratum.git
cd metastratum

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run format       # Format code with Prettier
```

## Project Structure

```
metastratum/
├── src/
│   ├── app/              # Next.js app router pages and layouts
│   ├── components/       # Reusable React components
│   ├── map/              # Map interface and bounding box selection
│   ├── terrain/          # DEM data fetching and mesh generation
│   ├── analysis/         # Geospatial analysis algorithms
│   │   ├── elevation/    # Slope, aspect, hillshade, contours
│   │   ├── hydrology/    # Flow, watershed, stream networks
│   │   ├── visibility/   # Viewshed and line-of-sight
│   │   └── tools/        # Cut/fill, path analysis, sampling
│   ├── visualization/    # Three.js/WebGPU 3D rendering
│   ├── export/           # Multi-format export functionality
│   ├── core/             # Core application logic and state
│   ├── lib/              # External library integrations
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions and utilities
├── docs/                 # Documentation
│   ├── api/              # API documentation
│   ├── architecture/     # Architecture diagrams
│   ├── algorithms/       # Algorithm explanations
│   └── guides/           # User and developer guides
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
├── public/               # Static assets
└── scripts/              # Build and utility scripts
```

### Path Aliases

TypeScript path aliases are configured for clean imports:

```typescript
import { Component } from '@/components/Component';
import { analyzeSlope } from '@/analysis/elevation/slope';
import { TerrainMesh } from '@/terrain/mesh';
import { MapView } from '@/map/MapView';
```

## Development

### Code Quality

Before committing, ensure your code passes all checks:

```bash
npm run type-check  # TypeScript type checking
npm run lint        # ESLint checks
npm run lint:fix    # Auto-fix linting issues
npm run format      # Format with Prettier
npm test            # Run test suite
```

### Testing

Write tests for all new functionality. Place tests either adjacent to source files (`component.test.tsx`) or in the `tests/` directory.

```bash
npm test                # Run all tests
npm test -- --watch     # Watch mode
npm run test:ui         # Interactive UI mode
npm run test:coverage   # Generate coverage report
```

### Commit Guidelines

Use conventional commit messages:

```
feat: add slope analysis algorithm
fix: correct mesh generation for edge cases
docs: update API documentation
test: add tests for watershed delineation
refactor: simplify flow direction calculation
perf: optimize hillshade generation
```

Commit types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `test` - Adding or updating tests
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `chore` - Maintenance tasks

## License

Apache 2.0 License - see [LICENSE](./LICENSE) for details.