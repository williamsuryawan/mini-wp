// User Controller for MiniWP William
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtConvert = require('../helpers/jwtConvert')
const googleSignin = require('../helpers/googleSignIn');


class UserController {
    static findAll (req,res) {
        User
            
            .find()
            .populate('listsArticle')
            .then(result => {
                res.status(200).json(result)
            })
            .catch (err => {
                res.status(500).json({
                    message: "Internal server error"
                })
            })
    }

    static register (req,res) {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(201).json({
                    message: `email ${user.email} is successfully added.`
                })
            })
            .catch (err => {
                res.status(500).json({
                    message: "Internal server error"
                })
            })
    }

    static login (req, res) {
        if(req.body.loginVia == 'website') {
            console.log("Masuk ke login via website, input:", req.body)
            User
                .findOne({
                    email: req.body.email
                })
                .then(user => {
                    if(!user) {
                        res.status(400).json({
                            message: `Wrong Email/Password`
                        })
                    } else {
                        console.log("User berhasil ditemukan ====>", user)
                        let isValid = bcrypt.compareSync(req.body.password, user.password)
                        console.log("Cek validity", isValid)
                        if(isValid) {
                            let token = jwtConvert.sign({email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                token: token,
                                id: user._id
                            })
                        } else {
                            res.status(400).json({
                                message: 'Wrong Email/Password'
                            })
                        }
                    }

                })
        } else if (req.body.loginVia == 'google') {
            console.log("Terjadi google sign in", req.body)
            googleSignin(req.body.id_token)
            
            .then(user => {
              User
                .findOne({
                  email: user.email
                })
                .then(findUser => {
                  if(!findUser) {
                    User
                      .create({
                        name: user.name,
                        email: user.email,
                        password: process.env.GOOGLE_DEFAULT_PASSWORD
                      })
                      .then(registerUser => {
                        let token = jwtConvert.sign({
                          email: registerUser.email
                        })
                        res.status(201).json({
                          token: token,
                          id: registerUser._id
                        })
                      })
                  } else {
                    let token = jwtConvert.sign({
                      email: user.email
                    })
                    res.status(200).json({
                      token: token,
                      id: findUser._id
                    })
                  }
                })
            })
        }
    }

    static getUserDetail(req,res) {
        User.findOne({
            email: req.loggedInUser.email
        })
        .populate('listArticle')
        .then(user => {
            res.status(200).json({
                message: `Detail of user ${user.email}:`,
                userid: user._id,
                email: user.email,
                listArticles: user.listsArticle
            })
        })
        .catch(error => {
            res.status(500).json({
                message: `Error: ${error}`
            })
        })
    }

}

module.exports = UserController;