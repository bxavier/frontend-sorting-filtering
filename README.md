# Frontend Sorting & Filtering Solution

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-8A4182?style=for-the-badge&logo=redux&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

## Overview

A modern Angular application demonstrating efficient client-side data processing for sorting and filtering operations,
delivering a responsive user experience without requiring server-side processing for each interaction.

## Features

### Client-Side Sorting

- Multi-level sorting with configurable criteria and directions
- Type-aware sorting for different data types (strings, numbers, dates)
- Persistent sort state between operations

### Advanced Filtering

- Combined filtering by multiple criteria (price range, status, company, etc.)
- Smart handling of filter combinations
- Real-time feedback as filters are applied

### User Interface

- Intuitive tabbed interface with predefined filter categories
- Responsive grid layout
- Financial summaries for filtered results

### Architecture

- Standalone Angular components
- NgRx Signal Store for state management
- Clean separation of concerns:
  - Components for UI presentation
  - Stores for state management
  - Services for business logic and API communication

## Technical Implementation

The application uses NgRx Signal Store for efficient state management with computed properties and reactive updates.

### Benefits

- Instant UI feedback without waiting for server responses
- Reduced server load by minimizing API calls
- Seamless offline operation after initial data load
- Excellent performance with moderate-sized datasets

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

## License

MIT
