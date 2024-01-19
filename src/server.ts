import path from 'path';
import App from './app';

const app = new App({
    routes: [
        new SampleRouter(),
        
    ],
    serve_statics: [
        {
            pathname: '/lib',
            baseDir: path.resolve('public'),
        },
    ],
});

app.listen();
const server = app.getServer();

export const appInstance = app.getAppInstance();

export default server;
