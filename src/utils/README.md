<div align="center">

# Logger Utility

</div>

A comprehensive logging system for the Todo List API that provides structured, colored output with environment-aware behavior.

## Overview

The logger utility offers multiple logging levels and specialized functions for different types of operations. It uses the `colors` npm package for enhanced terminal output and automatically adjusts behavior based on the `NODE_ENV` environment variable.

## Features

- **Environment-aware logging**: Different log levels shown based on development/production environment
- **Colored output**: Enhanced readability with color-coded log levels
- **Specialized logging functions**: HTTP requests, database operations, authentication events
- **Performance monitoring**: Built-in timing and performance measurement tools
- **Object logging**: Structured display of complex data objects
- **Automatic formatting**: Consistent timestamp and message formatting

## Basic Usage

```javascript
const logger = require("./logger");

// Basic logging levels
logger.info("Application started");
logger.success("Operation completed successfully");
logger.warn("This is a warning message");
logger.error("An error occurred");
logger.debug("Debug information"); // Only shown in development
logger.server("Server status message"); // Always shown
```

## Specialized Logging

### HTTP Requests

```javascript
logger.http("GET", "/api/todos", 200, 45); // method, path, status, duration
```

### Database Operations

```javascript
logger.database("SELECT", "todos", 25); // operation, table, duration
```

### Authentication Events

```javascript
logger.auth("User login successful", "user123");
```

### Object Logging

```javascript
logger.object("User data", { id: 1, name: "John" });
```

### Performance Monitoring

```javascript
// Method 1: Using timer
const timer = logger.timer("Database query");
// ... perform operation
timer.end();

// Method 2: Manual timing
const startTime = Date.now();
// ... perform operation
logger.performance("Operation name", startTime);
```

### Visual Separators

```javascript
logger.separator("SECTION TITLE");
```

## Environment Behavior

### Development Mode (`NODE_ENV=development`)

- All log levels are displayed
- Debug messages are shown
- Full colored output

### Production Mode (`NODE_ENV=production`)

- Only `error` and `server` logs are displayed
- Debug and info messages are suppressed
- Minimal output for performance

## Configuration

The logger automatically detects the environment and adjusts its behavior accordingly. No additional configuration is required.

## Dependencies

- `colors`: For terminal color output
- Built-in Node.js modules for core functionality

## File

- [`logger.js`](./logger.js): Main logger implementation

## Integration

The logger is designed to be imported and used throughout the application:

```javascript
const logger = require("../utils/logger");

// In controllers
logger.debug(`Processing request for user: ${userId}`);
logger.database("INSERT", "todos", executionTime);
logger.success("Todo created successfully");
```

This logging system provides comprehensive monitoring and debugging capabilities while maintaining clean, readable output across different environments.
