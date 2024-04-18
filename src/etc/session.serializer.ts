import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        // Store the user ID (or any identifier you prefer) in the session
        done(null, user);
    }

    deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
        // Retrieve the user information from the database or any store
        // based on the identifier stored in the session (payload)
        // For example, if only user ID is stored in the session:
        done(null, payload);
    }
}