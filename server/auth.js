import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import connection from './config/connection';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      const googleId = profile.id;
      const email = profile.email;
      const firstName = profile.given_name; // Google may use "given_name" for first name
      const lastName = profile.family_name; // Google may use "family_name" for last name
      const phoneNumber = profile.phone_number; // Access the phone number if provided by the user

      // Check if the student exists in the database by email
      const [rows] = await connection.promise().execute('SELECT * FROM student WHERE email = ?', [profile.email]);

      if (rows.length > 0) {
        // If the student exists, update the Google ID
        await connection.execute('UPDATE student SET googleId = ? WHERE email = ?', [profile.id, profile.email]);
        return done(null, rows[0]);
      } else {
        // If the student does not exist, create a new student record
        await connection.execute('INSERT INTO student (googleId, email, first_name, last_name, mobile) VALUES (?, ?, ?, ?, ?)', 
          [profile.id, profile.email, profile.given_name, profile.family_name, profile.phone_number]);

        // Retrieve the newly created student
        const [newRows] = await connection.promise().execute('SELECT * FROM student WHERE googleId = ?', [profile.id]);

        return done(null, newRows[0]);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));