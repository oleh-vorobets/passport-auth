import passport from 'passport';
import { User } from '../entities/user.entity';
import { pgDataSource } from '../database/app-data-source';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { Strategy as AppleStrategy } from 'passport-apple';

passport.serializeUser((user, done) => {
    done(null, (user as { id: number }).id);
});

passport.deserializeUser(async (id: number, done) => {
    const userRepository = pgDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    done(null, user);
});

async function findOrCreateUser(profileInfo: any): Promise<User> {
    const userRepository = pgDataSource.getRepository(User);

    const { id, displayName, emails, provider } = profileInfo;

    if (emails) {
        let user = await userRepository.findOneBy({ email: emails[0].value });
        if (!user) {
            user = userRepository.create({
                username: displayName,
                email: emails[0].value,
                provider: provider,
                providerId: id,
            });
            await userRepository.save(user);
        }
        return user;
    }

    throw new Error('Email not found in the profile.');
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENTID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: '/auth/google/redirect',
        },
        async (accessToken, refreshToken, profileInfo, done) => {
            try {
                const user = await findOrCreateUser(profileInfo);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENTID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
            callbackURL: '/auth/linkedin/redirect',
        },
        async (accessToken, refreshToken, profileInfo, done) => {
            try {
                const user = await findOrCreateUser(profileInfo);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENTID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            callbackURL: '/auth/facebook/redirect',
        },
        async (accessToken, refreshToken, profileInfo, done) => {
            try {
                const user = await findOrCreateUser(profileInfo);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new AppleStrategy(
        {
            clientID: process.env.APPLE_CLIENTID as string,
            teamID: process.env.APPLE_TEAM_ID as string,
            keyID: process.env.APPLE_KEY_ID as string,
            privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH as string,
            callbackURL: '/auth/apple/redirect',
            scope: ['name', 'email'],
        },
        async (req, accessToken, refreshToken, idToken, profileInfo, done) => {
            try {
                const user = await findOrCreateUser(profileInfo);
                done(null, user);
            } catch (error) {
                if (error instanceof Error) {
                    done(error);
                } else {
                    done(new Error('Something went wrong'));
                }
            }
        }
    )
);
