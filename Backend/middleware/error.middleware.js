import multer from "multer";

const errorHandler = (err, req, res, next) => {
    // Handle Multer-specific errors
    if (err instanceof multer.MulterError || err.name === "MulterError") {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "File size cannot exceed 5MB"
            });
        }
        return res.status(400).json({
            message: err.message
        });
    }

    // Handle custom upload filter error
    if (err.message === "Only image files are allowed") {
        return res.status(400).json({
            message: err.message
        });
    }

    // Determine status code
    const statusCode = err.statusCode || err.status || 500;
    const isProduction = process.env.NODE_ENV === "production";

    return res.status(statusCode).json({
        message: err.message || "Internal server error",
        ...(isProduction ? {} : { stack: err.stack })
    });
};

export default errorHandler;
