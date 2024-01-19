import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

let envPath: string | undefined;
export const env = process.env.NODE_ENV ?? 'development';

if (env === 'development') {
    const filepath = path.resolve('.env.development');
    if (fs.existsSync(filepath)) {
        envPath = filepath;
    }
} else if (env === 'production') {
    const filepath = path.resolve('.env.production');
    if (fs.existsSync(filepath)) {
        envPath = filepath;
    }
} else {
    const filepath = path.resolve('.env');
    if (!fs.existsSync(filepath)) {
        throw new Error('No .ENV found!');
    }
    envPath = filepath;
}

config({
    path: envPath,
});
