const express = require('express');
const router = express.Router();
const data = require('../bin/data.json');


router.get('/', (req, res, next) => {
    console.log(data)
    res.render('config', { data })
});
// router.get('/auth/google/callback', sessionMiddleware.isNotAuthenticated, usersController.doSocialLoginGoogle);
// router.get('/auth/slack', sessionMiddleware.isNotAuthenticated, usersController.doSocialLogin);
// router.get('/login', sessionMiddleware.isNotAuthenticated, usersController.login);
// router.post('/login', sessionMiddleware.isNotAuthenticated, usersController.doLogin);
// router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.signup);
// router.post('/users', sessionMiddleware.isNotAuthenticated, uploads.single('avatar'), usersController.createUser);
// router.get('/activate/:token', sessionMiddleware.isNotAuthenticated, usersController.activateUser);
// router.post('/logout', sessionMiddleware.isAuthenticated, usersController.logout);
// router.get('/tweets', sessionMiddleware.isAuthenticated, tweetsController.list);
// router.post('/tweets/:id/like', sessionMiddleware.isAuthenticated, tweetsController.like)

// router.get("/", (req, res) => {
//   res.redirect("/tweets");
// });

module.exports = router;