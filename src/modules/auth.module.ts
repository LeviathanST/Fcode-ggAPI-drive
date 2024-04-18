import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "src/controllers/oauth.controller";
import { SessionSerializer } from "src/etc/session.serializer";
import { AuthService } from "src/services/auth.service";
import { DriveService } from "src/services/drive.service";
import { GoogleStrategy } from "src/utils/Google.strategy";


@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, SessionSerializer]
})

export class AuthModule { }