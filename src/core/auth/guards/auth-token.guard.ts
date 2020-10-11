import {CanActivate, Injectable, UnauthorizedException} from "@nestjs/common";
import {ExecutionContext} from "@nestjs/common/interfaces/features/execution-context.interface";
import {Request} from "express";
import {AuthUser, LoggedUsers} from "../logged-users";

@Injectable()
export class AuthTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
        const req: Request = context.switchToHttp().getRequest();

        if (
            req.method === 'OPTIONS'
        ) {
            return true;
        }

        if (
            req.path.match(/\/auth\/(gaLogin|uuid|password|register)/gi) &&
            req.method === 'POST'
        ) {
            return true;
        }

        const authToken: string = req.headers.authorization;

        if (!authToken) {
            throw new UnauthorizedException();
        }

        const authUser: AuthUser | null = LoggedUsers.validateOrUpdateAuthUser(authToken);

        if (!authToken) {
            throw new UnauthorizedException('User is not authenticated !')
        }

        return (authUser instanceof AuthUser);
    }
}
