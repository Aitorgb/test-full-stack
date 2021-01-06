const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')


router.get('/',  userController.index);
router.post('/result', userController.resultCoach);
router.get('/*', (req, res, next ) => res.redirect('/'))

module.exports = router;
