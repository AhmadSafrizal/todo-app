class CustomAPIError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleError = (res, error) => {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: `Error: ${error.message}`,
    });
  };

module.exports = {CustomAPIError, handleError};