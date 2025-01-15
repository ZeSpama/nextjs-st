import passport, { Profile } from "passport";

type DoneCallback = (error: any, user?: any) => void;
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

// Alteração na definição de tipo do done
passport.use(new SteamStrategy({
    returnURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/return`,
    realm: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    apiKey: process.env.STEAM_API_KEY as string,
}, (_identifier: string, profile: Profile, done: DoneCallback) => {
    if (profile) {
        console.log("Perfil Steam:", profile);
        return done(null, profile);
    } else {
        return done(new Error("Erro no perfil Steam"));
    }
}));



console.log("RETURN URL:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/return`);
console.log("REALM:", `${process.env.NEXT_PUBLIC_BASE_URL}`);
console.log("STEAM API KEY:", process.env.STEAM_API_KEY);

export default passport;
