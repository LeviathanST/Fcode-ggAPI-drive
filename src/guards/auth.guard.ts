import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext) {
        const active = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return active;
    }
}