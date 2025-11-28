class SuccessHandler {
    constructor(message, data = {}, statusCode = 200) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            ...this.data,
        });
    }
}

export default SuccessHandler;
