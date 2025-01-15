import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";

export interface SteamProfile {
    displayName: string;
    id: string;
    identifier: string;
    photos: { value: string }[];
    provider: string;
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: SteamProfile, done) => {
    done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/return`,
    realm: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    apiKey: process.env.STEAM_API_KEY as string
}, (_identifier: string, profile: SteamProfile, done: (error: any, user?: any) => void) => {
    return done(null, profile);
}));

export default passport;
