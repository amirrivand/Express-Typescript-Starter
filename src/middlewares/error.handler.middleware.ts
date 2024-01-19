import logger from '@/util/logger';
import { NextFunction, Response } from 'express';
import { ValidationError as JoiValidationError } from 'joi';

export default class ErrorHandler {
    private static mode = process.env.NODE_ENV;
    private static isDev = this.mode === 'development';
    private static isProd = this.mode === 'production';

    public static joi = () => {
        return (error: unknown, _: never, res: Response, next: NextFunction) => {
            const statusCode = 400;
            if (error instanceof JoiValidationError) {
                if (this.isDev) {
                    return res.status(statusCode).json({
                        message: error.message,
                        errors: error.details,
                        dev: true,
                    });
                }
                if (this.isProd) {
                    return res.status(statusCode).json({
                        message: 'Validation Error!',
                        error: error.message,
                    });
                }
            }

            return next(error);
        };
    };

    public static global = () => {
        return (error: unknown, _: never, res: Response, next: NextFunction) => {
            if (this.isDev) {
                logger.error(error);
            }
            return res.status((error as any).statusCode ?? 500).json({
                message: (error as any).message,
                ...(this.isDev && {
                    error,
                }),
            });
        };
    };
}
