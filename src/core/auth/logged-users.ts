import {Injectable} from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuid = require('uuid');

@Injectable()
export class LoggedUsers {
    public static COUNT_DOWN_MILLISECONDS: number;
    private static _loggedUser: Array<AuthUser>;

    public static initLoggedUsers(): void {
        this.COUNT_DOWN_MILLISECONDS = 30 * 60 * 1000;

        if (!LoggedUsers._loggedUser) {
            LoggedUsers._loggedUser = [];
        }
    }

    public static validateOrUpdateAuthUser(authToken: string): AuthUser | null {
        const userFound: AuthUser = this._loggedUser.find(user => user.authToken === authToken);

        if (!userFound) {
            return null;
        }

        if (userFound.expireIn.valueOf() > new Date().valueOf()) {
            const index: number = this._loggedUser.findIndex(user => user.authToken === authToken);

            const newAuthUser: AuthUser = new AuthUser({
                username: userFound.username,
                accessLevel: userFound.accessLevel,
                authToken: userFound.authToken
            });

            LoggedUsers._loggedUser.splice(index, 1, newAuthUser);

            return newAuthUser;
        } else {

            this.removeAuthUser(authToken);

        }

        return null;
    }

    public static setNewAuthUser(username: string, accessLevel): AuthUser {
        const newAuthUser: AuthUser = new AuthUser({username, accessLevel});

        this._loggedUser.push(newAuthUser);

        return newAuthUser;
    }

    public static removeAuthUser(authToken: string): void {
        const index: number = this._loggedUser.findIndex(user => user.authToken === authToken);

        if (index !== -1) {
            this._loggedUser.splice(index, 1);
        }
    }
}

interface IAuthUser {
    username: string;
    accessLevel: number;
    authToken?: string;
}

export class AuthUser {
    private readonly _username: string;
    private _accessLevel: number;

    private readonly _authToken: string;
    private readonly _expireIn: Date;

    constructor(initData: IAuthUser) {
        this._username = initData.username;
        this._setAccessLevel = initData.accessLevel;

        this._authToken = initData.authToken || uuid.v1();

        this._expireIn = new Date(new Date().valueOf() + LoggedUsers.COUNT_DOWN_MILLISECONDS);
    }

    private set _setAccessLevel(value: number) {
        if (value >= 1 && value <= 9) {

            this._accessLevel = value;

        } else if (value < 1) {

            this._accessLevel = 1;

        } else {

            this._accessLevel = 9;

        }
    }

    get username(): string {
        return this._username;
    }

    get accessLevel(): number {
        return this._accessLevel;
    }

    get authToken(): string {
        return this._authToken;
    }

    get expireIn(): Date {
        return this._expireIn;
    }
}
