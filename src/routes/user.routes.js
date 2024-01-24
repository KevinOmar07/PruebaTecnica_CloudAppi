import { Router } from "express";
import { check } from "express-validator";
import { createUsers, deleteUsersById, getUsers, getusersById, updateUsersById } from "../controllers/user.controller.js";
import { userExists, validateUserId } from "../middlewares/validate-user.js";
import { validateInput } from "../middlewares/validate-input.js";

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

export default router;