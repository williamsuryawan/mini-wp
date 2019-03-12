// User Controller for MiniWP William
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtConvert = require('../helpers/jwtConvert')


class UserController {
    static findAll (req,res) {
        User
            .find()
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
                        console.log("User berhasil ditemukan ====>")
                        let isValid = bcrypt.compareSync(req.body.password, user.password)
                        console.log("Cek validity", isValid)
                        if(isValid) {
                            let token = jwtConvert.sign({email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                token: token
                            })
                        } else {
                            res.status(400).json({
                                message: 'Wrong Email/Password'
                            })
                        }
                    }

                })
        } else if (req.body.loginVia == 'googleSignIn') {

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