import '@/config/env';
import '@/config/passport';
import compression from 'compression'; // compresses requests
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express from 'express';
import session from 'express-session';
import { Server } from 'http';
import lusca from 'lusca';
import passport from 'passport';
import './config/passport';
import sequelize from './database/sequelize';
import Routes from './interfaces/router.interface';
import ErrorHandler from './middlewares/error.handler.middleware';
import logger, { httpLogger } from './util/logger';
import { ENVIRONMENT, SESSION_SECRET } from './util/secrets';

interface AppOptions {
    routes?: Routes[];
    serve_statics?: {
        pathname: string;
        baseDir: string;
    }[];
}

class App {
    // Create Express App
    protected app = express();
    protected server: Server;

    constructor(options: AppOptions) {
        this.initializeCors();
        this.initializeMiddlewares();
        this.initiaizeSession();
        this.initializeProtection();

        if (process.env.NODE_ENV === 'development') {
            this.app.use(errorHandler());
        }

        if (options?.routes && options?.routes?.length > 0) {
            this.initRoutes(options.routes);
        }

        if (options.serve_statics) {
            options.serve_statics.forEach(({ baseDir, pathname }) => {
                this.app.use(pathname, express.static(baseDir));
            });
        }

        this.initErrorHandlers();
    }

    private initializeMiddlewares() {
        // TRUST PROXY PASS
        this.app.enable('trust proxy');

        // APP CONSTANTS
        this.app.set('port', process.env.PORT ?? 3000);

        // GLOBAL MIDDLEWARES
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(passport.initialize());
        this.app.use(httpLogger());
    }

    private initiaizeSession() {
        this.app.use(
            session({
                resave: true,
                saveUninitialized: true,
                secret: SESSION_SECRET,
            }),
        );
    }

    private initializeProtection() {
        this.app.use(lusca.xframe('SAMEORIGIN'));
        this.app.use(lusca.xssProtection(true));
    }

    private initializeCors() {
        this.app.use(
            cors({
                credentials: process.env.ALLOW_CREDENTIALS ?? true,
                methods: 'GET,POST,PUT,DELETE,OPTIONS',
                maxAge: 8 * 60 * 60 * 1000,
                origin: process.env.ORIGINS.includes(',')
                    ? process.env.ORIGINS.split(',')
                    : process.env.ORIGINS,
            }),
        );
    }

    private initRoutes(routes: Routes[]) {
        routes.forEach(route => {
            const { group, path, router, middlewares } = route;
            const middleWares = middlewares
                ? Array.isArray(middlewares)
                    ? middlewares
                    : [middlewares]
                : [];
            const paths = ['', 'api', group];
            if (path) {
                paths.push(path);
            }
            this.app.use(paths.join('/'), ...middleWares, router);
        });
    }

    private async testDatabaseConnection() {
        await sequelize.authenticate();
    }

    private initErrorHandlers() {
        this.app.use(ErrorHandler.joi());
        this.app.use(ErrorHandler.global());
    }

    public listen() {
        this.server = this.app.listen(this.app.get('port'), async () => {
            try {
                await this.testDatabaseConnection();
                logger.info('Database connected.');
                logger.info(
                    '  App is running at http://localhost:%d in %s mode',
                    this.app.get('port'),
                    this.app.get('env'),
                );
                logger.debug('  Press CTRL-C to stop\n');
            } catch (err) {
                if (ENVIRONMENT === 'development') {
                    logger.error(err);
                }
                process.exit(0);
            }
        });
    }

    public getServer() {
        return this.server;
    }

    public getAppInstance = () => {
        return this.app;
    };
}

// app.use(
//     express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );

export default App;
