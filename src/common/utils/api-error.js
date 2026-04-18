

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad request") {
        return new ApiError(400, message);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    static conflict(message = "Conflict") {
        return new ApiError(409, message)
    };

    static notFound(message = "Not found") {
        return new ApiError(404, message)
    };

    static forbidden(message = "Forbiddeb") {
        return new ApiError(412, message)
    };

    static serverError(message = "Internal Server error") {
        return new ApiError(500, message)
    };

}


export default ApiError