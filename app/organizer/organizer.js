const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const organizers = require('../../models').organizers;


app.get('/', async (req, res) => {
    const allOrganizer = await organizers.findAll();
    const newArr = allOrganizer.map(org => {
        return {
            id: org.id,
            organizer_name: org.organizer_name,
            email: org.email,
            createdAt: org.createdAt,
            updatedAt: org.updatedAt,
            phone_number: org.phone_number
        }
    })
    res.json(newArr);
});

app.get('/:id', async (req, res) => {
    const org = await organizers.findOne({where: { id: req.params.id }})

    const newOrg = {
        id: org.id,
        organizer_name: org.organizer_name,
        email: org.email,
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
        phone_number: org.phone_number,
        bank_name: org.bank_name,
        bank_account_name: org.bank_account_name,
        bank_account: org.bank_account,

    }
    
    res.json(newOrg);
});

app.post('/register', async (req, res) => {
    const { 
        organizer_name, 
        email, 
        password, 
        bank_name, 
        bank_account, 
        phone_number, 
        bank_account_name 
    } = req.body;

    let errors = [];
    // res.send(req.body)
    //check required fields
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    if (!organizer_name || !email || !password || !bank_name || !bank_account || !phone_number || !bank_account_name) {
        errors.push({ msg: "Please fill in all fields." });
    }

    //check if password length
    if (password) {
        if (password.length < 6) {
            errors.push({ msg: "Password should be atleast 6 characters." });
        }
    }

    if (errors.length > 0) {
        res.send({
            errors,
            email
        })
    }
    else {
        // res.send("pass")
        organizers.findOne({where: { email: email }})
        .then((user) => {
            if (user) {
                //User exist
                errors.push({ msg: "Email is already registered" })
                res.send({
                    errors,
                    email
                })
            }
            else {
                //Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;

                        let hashed_password = hash;
                        try {
                            organizers.create({
                                organizer_name: organizer_name,
                                email: email,
                                password: hashed_password,
                                bank_name: bank_name,
                                bank_account: bank_account,
                                bank_account_name: bank_account_name,
                                phone_number: phone_number,
                                // createdAt: dateTime,
                                // updatedAt: dateTime
                            }).then((user) => {
                                var msg = {
                                    msg: "User registered Succesfully",
                                    user_id: user.id,
                                    user_email: user.email,
                                    status: 200
                                }
                                res.send(msg)
                            })
                        }
                        catch (err) {
                            res.send(err)
                        }

                    })
                })
            }
        })
    }

});

app.post('/login', async (req, res) => {
    // res.send("Hello")
    passport.authenticate('local', function (err, users, info) {
        if ((err) || (!users)) {
            return res.send({
                message: info.message,
                users: users
            });
        }
        req.logIn(users, function (err) {
            if (err) res.send(err);
            return res.send({
                message: info.message,
                users: users
            });
        });

    })(req, res);
});

app.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/');

});

module.exports = app;
