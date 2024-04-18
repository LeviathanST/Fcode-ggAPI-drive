
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallBack, Profile } from 'passport-google-oauth20';
import { DriveService } from 'src/services/drive.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URL,
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
            accessType: 'offline',
            prompt: 'consent',
        });


    }

    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallBack) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.giveName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken
        };

        console.log(user);
        

        done(null, user);
    }

}