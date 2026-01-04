import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

export enum TokenAvailability {}

export interface AccessTokenPayload {
    driverId: string;
    sessionId: string;
    accessExpiresAt: number;
    refreshExpiresAt: number;
}

export interface AccessTokenResult {
    name: string;
    ttl: number;
    token: string;
    payload: AccessTokenPayload;
}

@Injectable()
export class TokenService {
    constructor(
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
    ) {}

    generateAccessToken(params: { driverId: string; sessionId: string; }): AccessTokenResult {
        const now = Date.now();

        const accessExpiresInSec = this.config.get<number>('Jwt.accessExpiresInSec') ?? 3600;
        const refreshExpiresInSec = this.config.get<number>('Jwt.refreshExpiresInSec') ?? 3600;

        const accessExpiresAt = now + accessExpiresInSec * 1000;
        const refreshExpiresAt = now + refreshExpiresInSec * 1000;

        const ttl = refreshExpiresInSec * 1000;

        const payload = {
            did: params.driverId,
            sid: params.sessionId,
            aea: accessExpiresAt,
            rea: accessExpiresAt,
        };

        const token = this.jwt.sign(payload, {
            secret: this.config.get<string>('Jwt.access.secret'),
            expiresIn: accessExpiresInSec,
        });

        return {
            name: 'auth_driver',
            ttl,
            token,
            payload: {
                driverId: payload.did,
                sessionId: payload.sid,
                accessExpiresAt,
                refreshExpiresAt,
            }
        }
    }

    decode(token: string): any {
        try {
            return this.jwt.decode(token);
        } catch {
            return null;
        }
    }

    checkExpiry(token: string) {}
}