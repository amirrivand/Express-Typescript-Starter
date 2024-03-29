/**
 * Naming this file express-session.d.ts causes imports from "express-session"
 * to reference this file and not the node_modules package.
 */

import { User } from '@/models/User.model';

declare module 'express-session' {
    export interface SessionData {
        returnTo: string;
        device?: string;
        userId?: User["id"];
    }
}
