const express = require('express');
const { signUp, login, getUsers, friendRequest, acceptFriend } = require('../controllers/userController');
const router = express.Router();

router.post('/sign_up', signUp);
// router.get('/login', login);
router.get('/', getUsers);
// router.get('/users/:id', getUser);
// router.put('/users/:id', updateUser);
router.post('/friend-request', friendRequest);
router.post('/friend-accept', acceptFriend)

module.exports = router;
