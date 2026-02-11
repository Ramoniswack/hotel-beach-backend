import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { UserRole } from '../models/User';

export const configurePassport = () => {
  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // User exists, return user
            return done(null, user);
          }

          // Check if email already exists with local auth
          user = await User.findOne({ email: profile.emails?.[0]?.value });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.avatar = profile.photos?.[0]?.value;
            user.authProvider = 'google';
            await user.save();
            return done(null, user);
          }

          // Create new user
          const newUser = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
            authProvider: 'google',
            role: UserRole.GUEST,
            isActive: true,
          });

          done(null, newUser);
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );
};
