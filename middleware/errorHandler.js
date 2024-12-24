const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.type === 'ValidationError') {
    return res.status(400).json({
      error: err.message,
      details: err.details
    });
  }

  if (err.type === 'AuthenticationError') {
    return res.status(401).json({
      error: err.message
    });
  }

  if (err.type === 'NotFoundError') {
    return res.status(404).json({
      error: err.message
    });
  }

  // Default error
  res.status(500).json({
    error: 'Ein interner Serverfehler ist aufgetreten'
  });
};

class ValidationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.type = 'ValidationError';
    this.details = details;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.type = 'AuthenticationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.type = 'NotFoundError';
  }
}

module.exports = {
  errorHandler,
  ValidationError,
  AuthenticationError,
  NotFoundError
};
