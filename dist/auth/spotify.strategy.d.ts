import { Strategy } from 'passport-spotify';
declare const SpotifyStrategy_base: new (...args: any[]) => Strategy;
export declare class SpotifyStrategy extends SpotifyStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
