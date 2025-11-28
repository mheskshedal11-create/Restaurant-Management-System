class ErrorHandler {
    constructor(message, statusCode = 500) {
        this.success = false;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;
