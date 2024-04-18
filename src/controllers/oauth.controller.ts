import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAuthGuard } from "src/guards/auth.guard";



@Controller('auth')
export class AuthController {
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { msg: "Google Authentication!" }
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return { msg: 'OK!' }
    }

}