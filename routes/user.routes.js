const { Router } = require('express');
const { check } = require('express-validator');
const { createUsers, deleteUsersById, getUsers, getusersById, updateUsersById } = require ("../controllers/user.controller.js");
const { userExists, validateUserId } = require ("../middlewares/validate-user.js");
const { validateInput } = require ("../middlewares/validate-input.js");

const router = Router();

router.get('/getusers', getUsers);

router.post('/createUsers', [
    check('user.name', 'Invalid input').isString(),
    check('user.email', 'Invalid input').isEmail(),
    check('user.birthDate', 'Invalid input').isString(),
    check('user.address.street', 'Invalid input').isString(),
    check('user.address.state', 'Invalid input').isString(),
    check('user.address.city', 'Invalid input').isString(),
    check('user.address.country', 'Invalid input').isString(),
    check('user.address.zip', 'Invalid input').isString(),
    validateInput
], createUsers);

router.get('/getusersById/:userId', [
    validateUserId,
    userExists
], getusersById);

router.put('/updateUsersById/:userId', [
    validateUserId,
    userExists
], updateUsersById);

router.delete('/deleteUsersById/:userId', [
    validateUserId,
    userExists
], deleteUsersById)

module.exports = router;