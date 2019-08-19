const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const organizers = require('../models').organizers;



module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        organizers.findOne({where: { email: email }}).then((organizer) => {
            if (!organizer) {
                return done(null, false, { message: "This email is not registered." });
            }
            // Match password
            bcrypt.compare(password, organizer.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    var organizerDetails = {
                        id:organizer.id,
                        organizer_name:organizer.organizer_name,
                        email:organizer.email,
                        bank_name:organizer.bank_name,
                        bank_account:organizer.bank_account,
                        bank_account_name: organizer.bank_account_name,
                        phone_number: organizer.phone_number
                    }
                    return done(null, organizerDetails, { message: "Login Successfull" })
                }
                else {
                    return done(null, false, { message: "Password Incorrect" })
                }
            });
        })
            .catch((err) => {
                res.send(err)
            })
    })
    );
    passport.serializeUser(function (users, done) {
        done(null, users.id);
    });

    passport.deserializeUser(function (id, done) {
        organizers.findOne({ id: id }, function (err, user) {
            done(err, user);
        });
    });
}