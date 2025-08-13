const colors = require("colors");

/**
 * Logger utility class for handling different types of logs
 * with environment-aware behavior and color formatting.
 */
class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
    this.isProduction = process.env.NODE_ENV === "production";
  }

  /**
   * Gets the current timestamp in ISO format.
   * @returns {string} Current timestamp
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Formats a log message with timestamp and optional color.
   * @param {string} level - Log level
   * @param {string} message - Message to format
   * @param {Function} [colorFn] - Color function for styling
   * @returns {string} Formatted message
   */
  formatMessage(level, message, colorFn = null) {
    const timestamp = this.getTimestamp();
    const levelFormatted = `[${level.toUpperCase()}]`;

    if (this.isDevelopment && colorFn) {
      return `${colors.dim(timestamp)} ${colorFn(levelFormatted)} ${message}`;
    }

    return `${timestamp} ${levelFormatted} ${message}`;
  }

  /**
   * Logs general information (development only).
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (this.isDevelopment) {
      console.log(this.formatMessage("info", message, colors.blue), ...args);
    }
  }

  /**
   * Logs success messages (development only).
   * @param {string} message - Success message
   * @param {...any} args - Additional arguments
   */
  success(message, ...args) {
    if (this.isDevelopment) {
      console.log(
        this.formatMessage("success", message, colors.green),
        ...args
      );
    }
  }

  /**
   * Logs warning messages (development only).
   * @param {string} message - Warning message
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    if (this.isDevelopment) {
      console.warn(this.formatMessage("warn", message, colors.yellow), ...args);
    }
  }

  /**
   * Logs error messages (development and production).
   * @param {string} message - Error message
   * @param {...any} args - Additional arguments
   */
  error(message, ...args) {
    if (this.isDevelopment) {
      console.error(this.formatMessage("error", message, colors.red), ...args);
    } else if (this.isProduction) {
      // In production, only log errors without colors
      console.error(this.formatMessage("error", message), ...args);
    }
  }

  /**
   * Logs debug messages (development only).
   * @param {string} message - Debug message
   * @param {...any} args - Additional arguments
   */
  debug(message, ...args) {
    if (this.isDevelopment) {
      console.log(
        this.formatMessage("debug", message, colors.magenta),
        ...args
      );
    }
  }

  /**
   * Logs HTTP requests with status and timing.
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {number} statusCode - Response status code
   * @param {number} responseTime - Response time in milliseconds
   */
  http(method, url, statusCode, responseTime) {
    if (this.isDevelopment) {
      const colorFn =
        statusCode >= 400
          ? colors.red
          : statusCode >= 300
          ? colors.yellow
          : colors.green;

      const message = `${method.toUpperCase()} ${url} ${statusCode} - ${responseTime}ms`;
      console.log(this.formatMessage("http", message, colorFn));
    }
  }

  /**
   * Logs database operations with timing.
   * @param {string} operation - Database operation
   * @param {string} table - Table name
   * @param {number} duration - Operation duration in milliseconds
   */
  database(operation, table, duration) {
    if (this.isDevelopment) {
      const message = `${operation.toUpperCase()} ${table} - ${duration}ms`;
      console.log(this.formatMessage("db", message, colors.cyan));
    }
  }

  /**
   * Logs authentication events.
   * @param {string} message - Auth message
   * @param {string|null} [userId] - User ID
   */
  auth(message, userId = null) {
    if (this.isDevelopment) {
      const fullMessage = userId ? `${message} (User: ${userId})` : message;
      console.log(this.formatMessage("auth", fullMessage, colors.magenta));
    }
  }

  /**
   * Logs server events (always shown).
   * @param {string} message - Server message
   * @param {...any} args - Additional arguments
   */
  server(message, ...args) {
    if (this.isDevelopment) {
      console.log(
        this.formatMessage("server", message, colors.green.bold),
        ...args
      );
    } else {
      console.log(this.formatMessage("server", message), ...args);
    }
  }

  /**
   * Prints a visual separator line.
   * @param {string} [title] - Optional title for the separator
   */
  separator(title = "") {
    if (this.isDevelopment) {
      const line = "=".repeat(50);
      if (title) {
        console.log(`\n${colors.cyan(line)}`);
        console.log(`${colors.cyan.bold(` ${title} `)}`);
        console.log(`${colors.cyan(line)}\n`);
      } else {
        console.log(`${colors.cyan(line)}`);
      }
    }
  }

  /**
   * Logs objects in formatted JSON.
   * @param {string} label - Object label
   * @param {object} obj - Object to log
   */
  object(label, obj) {
    if (this.isDevelopment) {
      console.log(this.formatMessage("object", label, colors.cyan));
      console.log(JSON.stringify(obj, null, 2));
    }
  }

  /**
   * Logs performance timing.
   * @param {string} label - Performance label
   * @param {number} startTime - Start timestamp
   */
  performance(label, startTime) {
    if (this.isDevelopment) {
      const duration = Date.now() - startTime;
      const colorFn =
        duration > 1000
          ? colors.red
          : duration > 500
          ? colors.yellow
          : colors.green;

      console.log(
        this.formatMessage("perf", `${label} - ${duration}ms`, colorFn)
      );
    }
  }

  /**
   * Creates a performance timer.
   * @param {string} label - Timer label
   * @returns {object} Timer object with end() method
   */
  timer(label) {
    const startTime = Date.now();
    return {
      end: () => this.performance(label, startTime),
    };
  }
}

const logger = new Logger();

module.exports = logger;
