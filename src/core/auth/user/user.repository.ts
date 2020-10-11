import {EntityRepository} from "typeorm";
import {UserEntity} from "./user.entity";
import {GoogleConfig} from "../../../config/google-config.enum";
import {BadRequestException, UnauthorizedException} from "@nestjs/common";
import {AuthUser, LoggedUsers} from "../logged-users";
import {LoginTicket, TokenPayload} from "google-auth-library";
import {AbstractRepository} from "../../repository/abstract.repository";
import { TwoStepAuthDto } from './dto/two-step-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

@EntityRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity> {
    private readonly _client: any;

    constructor() {
        super();

        this._client = new OAuth2Client({
            clientId: process.env.GOOGLE_CLIENT_ID || GoogleConfig.CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || GoogleConfig.CLIENT_SECRET
        })
    }

    async gaLogin(idToken: string): Promise<UserEntity> {
        if (!idToken || idToken === '') {
            throw new BadRequestException('You have not provided googleIdToken !');
        }

        let pass: LoginTicket;
        let payload: TokenPayload;

        try {

            pass = await this._client.verifyIdToken({idToken});

        } catch (e) {

            throw new UnauthorizedException('Google idToken has expire !');

        } finally {

            payload = pass.getPayload();

        }

        const user: UserEntity = await this.findOneOrNotFound({username: payload.email});
        user.pictureSrc = payload.picture;

        const authUser: AuthUser = LoggedUsers.setNewAuthUser(user.username, user.userAccess);

        user.authToken = authUser.authToken;
        user.expireIn = authUser.expireIn;

        return user;
    }

    async uuid(username: string): Promise<UserEntity> {
        if (
          !username ||
          username === '' ||
          !username.match(/[a-zA-Z\._\-0-9]+@[a-z]+\.([a-z]+|[a-z]+\.[a-z]+)/gi)
        ) {
            throw new BadRequestException('Username provided is not an email!')
        }

        return await this.findOneOrNotFound({username});
    }

    async password(twoStepAuth: TwoStepAuthDto): Promise<UserEntity> {
        const {uuid, password} = twoStepAuth;

        const user: UserEntity = await this.findOneOrNotFound({uuid});

        const isAuth: boolean = await this._compareHashedPassword(user.password, user.passwordSalt, password);

        if (isAuth) {
            const authUser: AuthUser = LoggedUsers.setNewAuthUser(user.username, user.userAccess);

            user.authToken = authUser.authToken;
            user.expireIn = authUser.expireIn;

            return user;
        }

        throw new UnauthorizedException('Wrong password !');
    }

    async register(newUser: CreateUserDto): Promise<UserEntity> {
        const {firstName, lastName, username, password} = newUser;

        const user: UserEntity = new UserEntity();

        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.uuid = uuid.v1();
        user.passwordSalt = await bcrypt.genSalt();
        user.password = await this._hashPassword(user.passwordSalt, password);
        user.userAccess = 5;

        await user.save();

        return user;
    }

    // noinspection JSMethodCanBeStatic
    private async _hashPassword(salt: string, password: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    // noinspection JSMethodCanBeStatic
    private async _compareHashedPassword(hash: string, salt: string, password: string): Promise<boolean> {
        const comparableHash: string = await bcrypt.hash(password, salt);

        return (comparableHash === hash) as boolean;
    }
}
