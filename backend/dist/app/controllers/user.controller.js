"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.login = exports.store = exports.index = exports.all = void 0;
const User_1 = require("../models/User");
const generateToken_1 = require("../helpers/generateToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, User_1.getUsers)();
        if (users.length === 0) {
            return res.status(204).json({ message: 'No users found', status: false });
        }
        res.status(200).json({
            users,
            status: true
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
});
exports.all = all;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield (0, User_1.getUserById)(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found', status: false });
        res.status(200).json({
            user,
            status: true
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    console.log(password);
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        yield (0, User_1.createUser)({ name, email, password: hashedPassword });
        return res.status(200).json({
            status: true,
            message: "User created successfully!",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "User creating fail!",
        });
    }
});
exports.store = store;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId)
        return res.status(400).json({ message: 'This is user Id is doesn\'t exist' });
    try {
        const user = yield (0, User_1.deleteUserById)(userId);
        if (!user)
            return res.status(400).json({ message: 'This is user is doesn\'t exist' });
        res.status(200).json({
            userId,
            message: 'User deleted succesfully!',
            status: true
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.destroy = destroy;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, User_1.getUserByEmail)(email);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User doesn't exist in user.controller.login",
            });
        }
        // Ellenőrizzük a jelszót
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                status: false,
                message: "Wrong e-mail or password!",
            });
        }
        // Ha minden stimmel, generálunk egy refresh token-t és egy access token-t
        const accessToken = (0, generateToken_1.generateAccessToken)(user._id);
        const refreshToken = (0, generateToken_1.generateRefreshToken)(user._id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Csak HTTPS-en keresztül engedélyezett
            maxAge: 24 * 60 * 60 * 1000 // 1 nap
        });
        res.status(200).json({
            status: true,
            token: accessToken
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
exports.login = login;
